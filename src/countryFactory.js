//Add imports here
const URLCountries = "http://localhost:3333/countries";
const URLLabels = "http://localhost:3333/labels";

function handleHttpErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
}

class CountryFactory {
 
 constructor() {
    this.labels = [];
    this.countries = [];

    this.getLabels = this.getLabels.bind(this);
    this.getCountries = this.getCountries.bind(this);
    this.observer = this.observer.bind(this);
   }

   async observer() {
    var data = await this.getCountriesObserver();
    if(data.length !== this.countries.length) {
      this.countries = data;
      return true;
    }
    else {
      for (let index = 0; index < data.length; index++) {
        const object = data[index];
        for (const key in object) {
          if(object[key] instanceof Array) {
            if(JSON.stringify(object[key]) !== JSON.stringify(this.countries[index][key])) {
              this.countries = data;
              return true;
            }
          }
          else {
            if (object[key] !== this.countries[index][key]) {
              this.countries = data;
              return true;
            }
          }
        }
      }
      return false;
    }
  }

   async getLabels() {
     this.labels = await fetch(URLLabels).then(handleHttpErrors);
     return this.labels;
   }
   
   async getCountries() {
     this.countries = await fetch(URLCountries).then(handleHttpErrors);
     return this.countries;
   }

   async getCountriesObserver() {
    return await fetch(URLCountries).then(handleHttpErrors);
  }
}

export default new CountryFactory();