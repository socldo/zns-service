import { NotificationMessagePayload } from "firebase-admin/lib/messaging/messaging-api";


export class MessagePayloadZNS {
    id: number;
    restaurant_id: number;
    restaurant_brand_id: number;
    name: string;
    template_id: string;
    template_data: {
        id: string;
        date: string;
        customer_name: string;
    };
    send_at: string;
    phone: string;
    customer_name: string;
    authentication_code: string;
    refresh_token: string;
    oa_id?: string;
    app_id?: string;
    code_verifier?: string;
    secret_key?: string;
    access_token?: string;

    constructor(data?: any, phone?: string, customer_name?: string, access_token?: string,) {
        this.id = data ? data.id : 0;
        this.restaurant_id = data ? data.restaurant_id : 0;
        this.restaurant_brand_id = data ? data.restaurant_brand_id : 0;
        this.name = data ? data.name : "";
        this.template_id = data ? data.template_id : "";
        this.template_data = data ? data.template_data : { id: "", date: "", customer_name: "" };
        this.send_at = data ? data.send_at : "";
        this.phone = phone ? phone : "";
        this.customer_name = customer_name ? customer_name : "";
        this.authentication_code = data ? data.authentication_code : "";
        this.refresh_token = data ? data.refresh_token : "";
        this.oa_id = data ? data.oa_id : "";
        this.app_id = data ? data.app_id : "";
        this.code_verifier = data ? data.code_verifier : "";
        this.secret_key = data ? data.secret_key : "";
        this.access_token = access_token ? access_token : "";
    }
}