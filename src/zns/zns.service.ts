import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { firstValueFrom, from } from 'rxjs';
import { MessagePayloadZNS } from 'src/kafka/message.payload/message.zns.model';

@Injectable()
export class ZnsService {
    constructor(private readonly httpService: HttpService) { }

    /**
     * 
     * @param param { phones, template_id, access_token }
     */
    async sendZnsToListCustomer({ phones, template_id, access_token }: { phones: string[], template_id: string, access_token: string }): Promise<any> {
        const url = 'https://business.openapi.zalo.me/message/template';

        const data = {
            phones,
            template_id,
            template_data: {
                // ky: '1',
                // thang: '4/2020',
                // start_date: '20/03/2020',
                // end_date: '20/04/2020',
                // customer: 'Nguyễn Thị Hoàng Anh',
                // cid: 'PE010299485',
                // address: 'VNG Campus, TP.HCM',
                // amount: '100',
                // total: '100000',
            },
            tracking_id: 'tracking_id',
        };

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': access_token,
                    },
                }),
            );
            return response.data;
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn', error);
            throw error;
        }
    }

    async getAccessTokenByAuthenticationCode({ authenticationCode, secret_key, app_id, code_verifier }) {
        const url = 'https://oauth.zaloapp.com/v4/oa/access_token';

        // Dữ liệu gửi đi theo định dạng application/x-www-form-urlencoded
        const data = new URLSearchParams({
            code: authenticationCode,
            app_id: app_id,
            grant_type: 'authorization_code',
            code_verifier: code_verifier
        });

        try {
            const response = await firstValueFrom(
                from(axios.post(url, data.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'secret_key': secret_key
                    },
                }))
            );
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy access token', error);
            throw error;
        }
    }

    async getAccessTokenByRefreshToken({ refresh_token, secret_key, app_id, code_verifier }) {
        const url = 'https://oauth.zaloapp.com/v4/oa/access_token';
    
        // Dữ liệu gửi đi theo định dạng application/x-www-form-urlencoded
        const data = new URLSearchParams({
            refresh_token: refresh_token,
            app_id: app_id,
            grant_type: 'refresh_token',
            code_verifier: code_verifier
        });
    
        try {
            const response = await firstValueFrom(
                from(axios.post(url, data.toString(), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'secret_key': secret_key
                    },
                }))
            );
            return response.data;
        } catch (error) {
            console.error('Lỗi khi lấy access token', error);
            throw error;
        }
    }

    async sendZnsToCustomer(message: MessagePayloadZNS,  access_token: string ): Promise<any> {
        const url = 'https://business.openapi.zalo.me/message/template';
        
        const data = {
            phone: message.phone,
            template_id: message.template_id,
            template_data: message.template_data,
            tracking_id: message.id.toString(),
        };

        try {
            console.log(data);

            const response = await firstValueFrom(
                this.httpService.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': access_token,
                    },
                }),
            );
            
            return response.data;
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn', error);
            throw error;
        }
    }
}
