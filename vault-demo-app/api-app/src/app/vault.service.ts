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
}