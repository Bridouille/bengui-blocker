var updateOptions = function () {
	var self = this;

	this.usernames = [ ];

	this.init = function () {
		this.getUsernames(function (usernames) {
			self.updatePersons();
		});
		this.getPostsState(function (state) {
			$('#post-enabled').attr('checked', state);
		});
		this.getCommentsState(function (state) {
			$('#comment-enabled').attr('checked', state);
		});
	}

	this.updatePersons = function () {
		var persons = $('#blocked-persons');

		persons.empty();
		for (i in this.usernames) {
			persons.append($('<li/>', { 'class' : 'list-group-item', 'text' : this.usernames[i] })
				   .append($('<span/>', { 'class' :'badge', 'text' : 'X'})));
		}
	};

	this.getUsernames = function (callback) {
		chrome.storage.sync.get('username', function (items) {
			if (items["username"] && items["username"].length)
				self.usernames = items["username"].split(';');
			if (callback)
				callback(self.usernames);
		});
	};

	this.setUsernames = function (callback) {
		chrome.storage.sync.set({ 'username' : self.usernames.join(";") }, function () {
			if (callback)
				callback();
		});
	};

	this.addUsername = function (newUser, finish) {
		var idx = this.usernames.indexOf(newUser);

		if (idx === -1) {
			this.usernames.push(newUser);
			this.setUsernames(finish);
		}
	};

	this.removeUsername = function (toRemove, finish) {
		var idx = this.usernames.indexOf(toRemove);

		if (idx !== -1) {
			this.usernames.splice(idx, 1);
			this.setUsernames(finish);
		}
	};

	this.setPostsState = function (state, callback) {
		chrome.storage.sync.set({ 'posts' : state }, function () {
			if (callback)
				callback();
		});
	};

	this.setCommentsState = function (state, callback) {
		chrome.storage.sync.set({ 'comments' : state }, function () {
			if (callback)
				callback();
		});
	};

	this.getPostsState = function (callback) {
		chrome.storage.sync.get('posts', function (items) {
			if (items['posts'] !== undefined && callback)
				callback(items["posts"]);
		});
	};

	this.getCommentsState = function (callback) {
		chrome.storage.sync.get('comments', function (items) {
			if (items['comments'] !== undefined && callback)
				callback(items["comments"]);
		});
	};
}