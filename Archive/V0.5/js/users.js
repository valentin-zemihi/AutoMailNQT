class users {
    constructor (firstName, lastName, gender, work, region, shortRegion) {
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.gender = gender ;
        this.work = work ;
        this.region = region ;
        this.shortRegion = shortRegion ;

        this.sign = this.firstName+" "+this.lastName+", "+this.work+" NQT "+this.shortRegion ;
    }
}