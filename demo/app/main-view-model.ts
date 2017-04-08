import { Observable } from 'data/observable';
import { MypluginVesy } from 'nativescript-myplugin-vesy';

export class HelloWorldModel extends Observable {
  public message: string;
  private mypluginVesy: MypluginVesy;

  constructor() {
    super();

    this.mypluginVesy = new MypluginVesy();
    this.message = this.mypluginVesy.message;
  }
}