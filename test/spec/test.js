/*global describe, it */
'use strict';

(function () {
    describe('Model Tests...', function () {
        describe('Contact Person', function () {
            
        	var cp1 = new ContactPerson("Valdique", "Soriano", "val@gmail.com");
        	var cp2 = new ContactPerson("Jerisleu", "Silfrano", "jeri@gmail.com");

            it('should show its description', function () {
            	expect(cp1.toString()).toEqual("Valdique Soriano - val@gmail.com");
            });

            it('should have a first name', function () {
            	expect(cp1.firstName).toEqual("Valdique");
            });

            it('should have a last name', function () {
            	expect(cp2.lastName).toEqual("Silfrano");
            });

            it('should have a new first name', function () {
            	cp1.firstName = "Biruleibe";
            	expect(cp1.firstName).toEqual("Biruleibe");
            });
        });

        describe('Job', function () {
        	var j1 = new Job(new Company("IVIA", "www.ivia.com.br"), 
        		"www.vaguinhadukrai.com.br", "Encanador", 
        		new ContactPerson("Biruleibe", "Gibson", "biru@gmail.com"),2, 0);

            it('should have a company', function () {
            	expect(j1.company.name).toEqual("IVIA");
            });

            it('should have a position', function () {
            	expect(j1.position).toEqual("Encanador");
            });

            it('should have a Contact Person\'s name', function () {
            	expect(j1.contactPerson.firstName).toEqual("Biruleibe");
            });

            it('should have a initial status equals to Not Contacted', function () {
            	expect(j1.status).toEqual("Not Contacted");
            });

			it('should have one status in its event history', function () {
            	expect(j1.history.length).toEqual(1);
            });	 

            it('should have a second status as Resume/CL Sent', function () {
            	j1.advanceStatus();
            	expect(j1.status).toEqual("Resume/CL Sent");
            });

            it('should have a 2 stars rate', function () {
            	expect(j1.rate).toEqual(2);
            });	 	           
        });
    });
})();
