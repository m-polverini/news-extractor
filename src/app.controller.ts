import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private httpService: HttpService,
  ) {}

  @Get('/news')
  getNews(): Observable<{ title: string; url: string }[]> {
    let result: { title: string; url: string }[] = [];
    let string = 'loading';
    return this.httpService.get('https://www.corrieredellosport.it/').pipe(
      map((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        $('a:contains("roma")', html).each(function () {
          const title = $(this).text();
          const url = $(this).attr('href');
          result.push({ title, url });
        });
        return result;
      }),
    );
  }
}
