/*
app.js, main Angular application script
define your module and controllers here
*/
"use strict";

var validateForms;

angular.module('talkingBack', ['ui.bootstrap'])
	.config(function($httpProvider) {
		$httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'ketzghfBmqcqysxaZNoGUQdqLc9NkiFDfTUt1n5I';
		$httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'tgNAVRqpAklLYwiJSWI7HOIK4dOTxfzagLXoqBDc';
	})

	.controller('commentController', function($scope, $http) {
	
	$scope.refreshComments = function() {
		$scope.loading = true;
		$http.get('https://api.parse.com/1/classes/comments')
			.success(function(responseData) {
				$scope.comments = responseData.results;
			})
			.error(function(err) {
				console.log(err);
			})
			.finally(function() {
				$scope.loading = false;
			});
	}
	$scope.refreshComments();
	

		$scope.newComment = { score : 0 };

		$scope.addComment = function(comment) {
			$scope.uploading = true;
			$http.post('https://api.parse.com/1/classes/comments', comment)
				.success(function(responseData) {
					comment.objectId = responseData.objectId;
					$scope.comments.push(comment);
					$scope.newComment = {score : 0};

				})
				.error(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.uploading = false;
					$scope.refreshComments();
				});
		};

		var upVote = {
			score: {__op: 'Increment', amount: 1}
		};

		$scope.increaseVote = function(comment) {
			$http.put('https://api.parse.com/1/classes/comments/' + comment.objectId, upVote)
				.success(function(responseData){
			
				})
				.error(function(err) {
					console.log(err);
				});
		};
		
		var downVote = {
			score: {__op: 'Increment', amount: -1}
		};


		$scope.decreaseVote = function(comment) {
			if (comment.score > -1) {
				$http.put('https://api.parse.com/1/classes/comments/' + comment.objectId, downVote)
					.success(function(responseData){
						
					})
					.error(function(err) {
						console.log(err);
					});
			}
		};

		var upVote = {
			score: {__op: 'Increment', amount: 1}
		};
		
		$scope.increaseVote = function(comment) {
			$http.put('https://api.parse.com/1/classes/comments/' + comment.objectId, upVote)
				.success(function(responseData){

				}) 
				.error(function(err) {
					console.log(err);
				});
		};
		
		var downVote = {
			score: {__op: 'Increment', amount: -1}
		}

		$scope.decreaseVote = function(comment) {
			$http.put('https://api.parse.com/1/classes/comments/' + comment.objectId, downVote)
				.success(function(responseData){

				}) 
				.error(function(err) {
					console.log(err);
				});
		};

		$scope.deleteComment = function(comment) {
			$http.delete('https://api.parse.com/1/classes/comments/' + comment.objectId)
				.success(function(responseData){

					$scope.refreshComments();
				})
				.error(function(err) {
					console.log(err);
				});
		}

			$scope.order = '-score';

		$scope.ratingStates = [
    		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    		{stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
    	];

	});

	$('#submit').click(function(event) {
		var requiredFields = ['#name', '#title', '#commentBody'];
		 	var valid = true;
		 	var i;
		 	for (i = 0; i < requiredFields.length; i++) {
				
		 		if ($(requiredFields[i]).val().trim().length == "") {
		 			$(requiredFields[i]).addClass('invalid');
		 			valid = false;
		 		} else {
		 			$(requiredFields[i]).removeClass('invalid');
		 			
		 		}
			}
			if (valid == false) {
				event.preventDefault();
			}
	});
