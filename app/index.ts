import './styles/styles.scss';
import 'DataTables.net';
// import {Observable} from "rxjs"
// import {Observable} from 'rxjs/Observable'
import 'rxjs/add/Observable'
import { Observable, interval, from } from 'rxjs'
import { tap, take} from 'rxjs/operators'
import { users, companies } from './services/fetch'

window.onload = () => {
  loadData(result);
};

function addTd(tr: HTMLDivElement, tdValue: any) {
  let td = document.createElement('td');
  td.append(tdValue);
  tr.append(td);
}

function addUser(result: Array<Object>, userObject: {name: number, email: string}, td3: HTMLDivElement) {
  result.push({
    name: userObject.name,
    email: userObject.email
  });

  let p = document.createElement('p');
  p.append(userObject.name + ' ' + userObject.email);
  td3.append(p);
}

function sortData() {
  try {
    let headID = document.getElementsByTagName('head')[0];

    let propper = document.createElement('script');
    propper.type = 'text/javascript';
    propper.src =
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';

    let jQuery = document.createElement('script');
    jQuery.src =
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';

    let jQueryTable = document.createElement('script');
    jQueryTable.src =
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js';

    headID.appendChild(propper);
    (<any>$('.mydatatable')).DataTable({
      order: [[1, 'asc']]
    });

    headID.appendChild(jQuery);
    headID.appendChild(jQueryTable);
  } catch (error) {
    return error;
  }
}

let result: Array<Object | number> = [];

// without any length not works
async function loadData(result: Array<any>) {
  let tbody = document.querySelector('tbody');

  let companyResponse = await (await companies).json();
  let userResponse = await (await users).json();

  // const stream$ = interval(500)
  // .pipe(
  //   tap((v: any) => { console.log(v)}),
  //   take(5)
  // )
  // stream$.subscribe((val: any) => { console.log(val) })
  let fetchResult: any =  (fetch('http://localhost:3000/companies'));
  Observable.from(fetchResult)
    .map((el: any) => { el })
    .subscribe(console.log)
  fetchResult.subscribe((x: any) => console.log(x.name), (e: any) => console.error(e));

  companyResponse.forEach((company: {name: string, uri: string}) => {

    result[parseInt(company.name)] = [];
    let tr = document.createElement('tr');
    let td3 = document.createElement('td');

    // add first td = 'company_name'
    addTd(tr, company.name);

    userResponse.forEach((user: { uris: { company: string}, name: number, email: string}) => {
      if (company.uri === user.uris.company) {
        // add third td workers data
        addUser(result[parseInt(company.name)], user, td3);
      }
    });

    // add second td number of workers
    addTd(tr, result[parseInt(company.name)].length);
    tr.append(td3);
    tbody.append(tr);
  });
  
    await sortData();
}