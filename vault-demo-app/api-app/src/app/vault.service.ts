import { Injectable, OnModuleInit } from "@nestjs/common";
import Vault from 'node-vault';

@Injectable()
export class vaultService implements OnModuleInit {
    private readonly vault: any;
    private dbSecret: string = '';

    constructor() {
        this.vault = Vault({
            apiVersion: 'v1',
            endpoint: 'http://localhost:8200/',
            token: 'my-super-secret-token'
        });
    }

    async onModuleInit() {
        try {
            const response: any = await this.vault.read('secret/data/secret/data/config');

            if(response?.data?.data) {
                this.dbSecret = response.data.data.DATABASE_URL;
                console.log('Database URL retrieved from Vault:', this.dbSecret);
            } else {
                console.error('No data found in the Vault response.');
            }
        } catch (error) {
            console.error('Error occurred while fetching data from Vault:', error);
        }
    }
}