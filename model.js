const statuses = 
[ "Not Contacted", "Resume/CL Sent", 
  "Waiting Call for Interview", "Interview Scheduled", 
  "Waiting Final Reply", "Success", "Fail"]; 

const jobSources = ["Stackoverflow careers", "Monster", "Linkedin"];

function ContactPerson(firstName, lastName, email){
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
}

ContactPerson.prototype = {
  constructor: ContactPerson,
  toString:function(){
    return this.firstName + " " + this.lastName 
      +  " - " + this.email;
  }
}

function Company(name, website){
  this.name = name;
  this.website = website;
}

Company.prototype = {
  constructor: Company,
  toString:function(){
    return this.name;
  }
}

function Status(description){
  this.description = description;
  this.date = Date.now();
}

Status.prototype = {
  constructor: Status,
  toString:function(){
    return this.description + " - " + this.date;
  }
}

function Job(company, link, position, contactPerson, rate, statusIndex){
  this.company = company;
  this.link = link;
  this.position = position;
  this.statusIndex = statusIndex; 
  this.status = statuses[this.statusIndex];
  this.history = [];
  this.history.push(new Status(this.status));
  this.contactPerson = contactPerson;
  this.rate = rate;
  this.date = Date.now();
}

Job.prototype = {
  constructor: Job,
  toString:function(){
    return this.position + " at " + this.company.name 
      + " current status: " + this.status;
  },

  advanceStatus:function(){
    this.statusIndex++;
    this.status = statuses[this.statusIndex];
    this.history.push(new Status(this.status));
    console.log("advancing status to " + this.status);
  }
}
