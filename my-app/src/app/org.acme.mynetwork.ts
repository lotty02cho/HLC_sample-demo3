import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.mynetwork{

   export class Commodity extends Asset {
      tradingSymbol: string;
      description: string;
      mainExchange: string;
      quantity: number;
      owner: Member;
   }

    export class Pig extends Asset {
      pig_no: string;
      birth_date: string;
      gender: string;
      kind: string;
      size: string;
      mem_no: string;
      owner: Member;
   }
   export class Member extends Participant {
       mem_no: string;
       mem_flag: string;
       mem_name: string;
   }

   export class TradePig extends Transaction {
       pig: Pig;
       newOwner: Member;
   }


// }
