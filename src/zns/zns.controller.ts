import { Controller } from '@nestjs/common';
import { ZnsService } from './zns.service';
import { GrpcMethod } from '@nestjs/microservices';
import { ResponseData } from 'src/utils.common/utils.response.common/utils.response.common';
import { BaseHttpClientResult } from 'src/utils.common/utils.httpclient.result.common/utils.base.response.common';

@Controller('zns')
export class ZnsController {
    constructor(private readonly znsService: ZnsService) { }


    @GrpcMethod("ZNSService", "SendZnsToListCustomer")
    async znsToListCustomer(
        znsToListCustomerDto: {
            phones: string[];
            template_id: string;
            access_token: string;
        }
    ): Promise<ResponseData> {
        let response: ResponseData = new ResponseData();

        let responseData: BaseHttpClientResult = await this.znsService.sendZnsToListCustomer(znsToListCustomerDto);
        // console.log(responseData);

        response.setData(responseData.getData())
 
        response.setStatusGrpc(responseData.getStatus());
        response.setMessageGrpc(responseData.getMessage());

        return response;
    }
}
