
var bengui = function () {
	var self = this;

	this.usernames = [ ];
	this.posts = false;
	this.comments = true;
	this.timestep = 1000 * 1;
	this.update = new updateOptions();

	this.removeComments = function () {
		var comments_block = document.querySelectorAll('.uiUfi');

		for (i in comments_block) {
			var comment_block = comments_block[i];
			var comment_list = comment_block.firstChild ? comment_block.firstChild.children : null;

			for (j in comment_list) {
				var link_profile = comment_list[j];

				if (typeof link_profile == "object") {
					var hrefProfile = link_profile.querySelector('.UFIImageBlockImage');

					if (hrefProfile == null)
						continue ;
					hrefProfile = hrefProfile.getAttribute("href");
					if (hrefProfile == null)
						continue ;
					hrefProfile = hrefProfile.split("?")[0].split('/').reverse()[0];
					if (self.usernames.indexOf(hrefProfile) !== -1) {
						comment_block.firstChild.removeChild(comment_list[j]);
					}
				}
			}
		}
	}

	this.removePosts = function () {
		var posts_block = document.querySelectorAll('._4-u2.mbm');
		
		for (i in posts_block) {
			var post_block = posts_block[i];

			if (typeof post_block == "object") {
				var hrefProfile = post_block.querySelector('.clearfix._5x46 > a');

				if (hrefProfile == null)
					continue ;
				hrefProfile = hrefProfile.getAttribute("href");
				if (hrefProfile == null)
					continue ;
				hrefProfile = hrefProfile.split("?")[0].split('/').reverse()[0];
				if (self.usernames.indexOf(hrefProfile) !== -1) {
					post_block.parentNode.removeChild(post_block);
				}
			}
		}
	}

	this.updateOptions = function (changes, areaName) {
		if (changes["comments"] !== undefined) {
			self.comments = changes["comments"].newValue;
		}
		if (changes["posts"] !== undefined) {
			self.posts = changes["posts"].newValue;
		}
		if (changes["username"] !== undefined) {
			self.usernames = changes["username"].newValue.split(';');
		}
	}

	this.check = function () {
		if (self.comments) {
			self.removeComments();
		}
		if (self.posts) {
			self.removePosts();
		}
	}

	this.update.getUsernames(function (usernames) {
		self.usernames = usernames;
	});

	this.update.getPostsState(function (state) {
		self.posts = state;
	});

	this.update.getCommentsState(function (state) {
		self.comments = state;
	});
	setInterval(this.check, this.timestep);
}

$(document).ready(function () {
	var cleaner = new bengui();

	chrome.storage.onChanged.addListener(cleaner.updateOptions);
});