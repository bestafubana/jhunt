(function() {
  var app = angular.module('jHunt', ['store-directives']);

  app.controller('JHuntController', ['$http','$sce','$scope',function($http,$sce,$scope){
    
    $scope.jobs = [];
    $scope.statuses = statuses;
    $scope.jobSources = jobSources;
    $scope.newStars = -1;
    $scope.jobSource = -1;
    $scope.error = "";
    
    $http.get('jobs.json').success(function(data){
        $scope.jobs = data;
    });

    $scope.job = {};

    $scope.addJob = function() {
      $scope.job = new Job(new Company($scope.job.company.name, $scope.job.company.website), 
            $scope.job.link, $scope.job.position, 
            new ContactPerson($scope.job.contactPerson.firstName, 
              $scope.job.contactPerson.lastName, $scope.job.contactPerson.email), 
            $scope.job.stars, $scope.job.statusIndex);

      $scope.jobs.push($scope.job);
      $scope.job = {};
    };

    $scope.loadJobForm = function(job){
      $scope.job = job;
      $scope.newStars = job.stars;

      $("#formBox").show();
      $("h4 input").val("-");      
    };

    $scope.advanceStatus = function(job){
      var newIndex = ++job.statusIndex;
      $scope.setStatus(job, newIndex);
    };

    $scope.isNotFinal = function(job){
      return job.statusIndex > 4;
    };

    $scope.setStatus = function(job, st){
      job.statusIndex = st;
      job.status = statuses[job.statusIndex];
      job.history.push(new Status(job.status));
    };

    $scope.starsToDisplay = function(stars){
      var starsDisplay = "";

      for(var i=0; i < stars; i++){
        starsDisplay += "&hearts;"
      }

      return $sce.trustAsHtml(starsDisplay);
    };

    $scope.updateStars = function(job, val){
      job.stars = $sce.trustAsHtml(val);
    };

    $scope.countStatus = function(statusIndex){
      var count = 0;
      for(var i=0; i<$scope.jobs.length; i++){
        if($scope.jobs[i].statusIndex == statusIndex){
          count++;
        }
      }
      return count;
    }

    $scope.countNotStatuses = function(statusIndexes){
      var count = 0;
      for(var i=0; i<$scope.jobs.length; i++){
        var notStatus = true;
        for(var j=0; j<statusIndexes.length; j++){
          if($scope.jobs[i].statusIndex == statusIndexes[j]){
            notStatus = false;
            break;
          }
        }
        if(notStatus){
            count++;
        }
      }
      return count;
    }

    $scope.loadJob = function(){
      if($scope.jobSource == jobSources[0]){
        loadJobSO();
      }else if($scope.jobSource == jobSources[1]){
        loadJobMonster();
      }else if($scope.jobSource == jobSources[2]){
        loadJobLI();
      }
    };

    $scope.loadJobSO = function(){

        $http.get($scope.linkao).
        success(function(data, status, headers, config) {
            var job = {}

            $scope.job.position = $(data).find("#hed > h1 > a").html();
            $scope.job.link =  $scope.linkao;
            $scope.job.company = 
            {
                "name": $(data).find("#hed > a.employer").html(),
                "website": $(data).find("#hed > a.employer").attr("href")
            };


            $scope.job = new Job(new Company($scope.job.company.name, 
              $scope.job.company.website), 
            $scope.job.link, $scope.job.position, 
            new ContactPerson("", "", ""), 
            "", 0);
        }).
        error(function(data, status, headers, config) {
            $scope.error = "We could not load this job.";
        });

    };

    $scope.loadJobMonster = function(){
      $http.get($scope.linkao).
        success(function(data, status, headers, config) {
            var job = {}

            $scope.job.position = $(data).find("#CJT-jobbody h1").text();
            alert($scope.job.position);
            $scope.job.link =  $scope.linkao;
            $scope.job.company = {"name": "","website": ""};


            $scope.job = new Job(new Company($scope.job.company.name, 
              $scope.job.company.website), 
            $scope.job.link, $scope.job.position, 
            new ContactPerson("", "", ""), 
            "", 0);
        }).
        error(function(data, status, headers, config) {
            $scope.error = "We could not load this job.";
        });
    };  

    $scope.loadJobLI = function(){

    };

    $scope.toggleForm = function(){
      $("#formBox").toggle();
      $scope.job = {};
      $scope.newStars = -1;

      if($("#formBox").css("display") == "none"){
        $("h4 input").val("+");
      }else{
        $("h4 input").val("-");
      }
    };
    // http://vancouver.craigslist.ca/van/web/5037412901.html
    // http://careers.stackoverflow.com/jobs/84266/software-developer-qhr-technologies
    
  }]);

})();