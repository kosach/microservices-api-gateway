import { Controller, Get, Logger } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientOptions, ClientProxy, ClientGrpc, Client } from '@nestjs/microservices';
import { AppService } from './app.service';
import { microserviceOptions } from './grpc.options';


@Controller()
export class AppController {
  private client: ClientProxy;
  @Client(microserviceOptions)
  private clientGrpc: ClientGrpc;
  private grpcService: any;
  private logger = new Logger('AppController')
  onModuleInit() {
    this.grpcService = this.clientGrpc.getService<any>('AppController'); 
  }   
  constructor(private readonly appService: AppService) {
    const microserviceOptions: ClientOptions = {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877,
      }
    };
    this.client = ClientProxyFactory.create(microserviceOptions);
  }

  @Get('tcp')
  getHello(): any {
    return this.client.send<string, any>('getUser', 'tsp');
  }
  @Get('grpc')
  getGrpc(): any {
    return this.grpcService.getUser({id: 'id'});
  }
}



