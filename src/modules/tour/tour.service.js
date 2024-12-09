// توی سرویس میایم پردازش ها رو انجام میدیم و به دیتابیس وصل میشیم

const Tourmodel = require('./tour.model');
const autoBind = require('auto-bind');
const createHttpError = require('http-errors');
const { TourMessage } = require('./tour.message');




class TourService{
    // نمونه ای از مدل میسازیم
    #model;
    constructor(){
    autoBind(this);
    this.#model = Tourmodel;
    
    }
    async create(tourDto) {
    await this.checkExistByname(tourDto.nameTour);
     await this.checkDate(tourDto.Returndate,tourDto.departureDate);
    const tour = await this.#model.create(tourDto);
        return tour;
    }

    async find(){
        return await this.#model.find({}, {__v: 0}, {sort: {_id: -1}});
    }


    async search(origin, destination) { 
        if (!origin || !destination)
             return res.status(400).json({ message: 'origin and destination are required' });
    return await this.#model.findOne(origin, destination).exec(); 
        
}
    

    async remove(id){
        await this.checkExistById(id);
            await this.#model.deleteMany({_id: id});
        return true;
    }

    async update(id,tourDto){
        await this.checkExistById(id);
        return await this.#model.updateOne({_id: id}, {$set: tourDto})

    }


    async checkExistById(id) {
        const tour = await this.#model.findById(id);
        if(!tour) throw new createHttpError.NotFound(TourMessage.NotFound);
        return tour;
    }
    async checkExistByfilter(origin,destination) {
        const tour = await this.#model.findOne(origin,destination);
        if(!tour) throw new createHttpError.NotFound(TourMessage.NotFound);
        return tour;
    }
    async checkExistByname(nameTour) {
        const tour = await this.#model.findOne({nameTour});
        if(tour) throw new createHttpError.Conflict(TourMessage.exsist);
        return null;
    }

    async checkDate(departureDate,Returndate) {
        const depDate = new Date(departureDate);
        const retDate = new Date(Returndate);
        const tour = await this.#model.findOne({departureDate,Returndate});
          if(retDate <= depDate) throw new createHttpError.NotFound(TourMessage.errorDate);
        return  tour;
    }
   
}

    module.exports = new TourService();