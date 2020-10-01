const app = angular.module("crudApp", []);

app.controller("appCtrl", [
  "$scope",
  "$http",
  ($scope, $http) => {
    $scope.currentView = "listView";
    $scope.editIndex = "";
    $scope.deleteIndex = "";
    $http
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        $scope.posts = response.data.splice(0, 5);
      });

    $scope.changeView = (val) => {
      $scope.currentView = val;
    };

    $scope.addPost = (post) => {
      if (post) {
        let newPost = {
          title: post.title,
          body: post.description,
          id: Math.floor(Math.random() * 99),
        };
        $scope.posts.unshift(newPost);
        $scope.changeView("listView");
      } else {
        alert(
          "Form incomplete! Please fill out all relevant information before submitting."
        );
      }
    };

    $scope.editPost = (index) => {
      $scope.edit = $scope.posts[index];
      $scope.editIndex = index;
      $scope.changeView("editView");
    };

    $scope.submitEdit = (person) => {
      console.log(person);
      if (person) {
        let editPerson = {
          title: person.title,
          id: $scope.posts[$scope.editIndex].id,
          body: person.description,
        };
        $scope.posts[$scope.editIndex] = editPerson;
        console.log($scope.posts);
        $scope.changeView("listView");
      } else {
        alert(
          "Form incomplete! Please fill out all relevant information before submitting."
        );
      }
    };

    $scope.deletePost = (index) => {
      $scope.delete = $scope.posts[index];
      $scope.deleteIndex = index;
      $scope.changeView("deleteView");
    };

    $scope.submitDelete = () => {
      let index = $scope.deleteIndex;
      $scope.posts.splice(index, 1);
      $scope.changeView("listView");
    };
  },
]);
