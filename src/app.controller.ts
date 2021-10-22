import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/news')
  getNews(): { title: string; url: string }[] {
    axios
      .get('https://www.corrieredellosport.it/')
      .then((response: AxiosResponse<string>) => {
        console.log(response.data);
        let $ = cheerio.load(response.data);
        console.log($);
      });
    return [];
  }
}
