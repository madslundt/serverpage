var sabnzbd_request = $.ajax({
    url: wp.ajaxurl,
    type: "POST",
    data: {
        action: 'connectionStatus'
    }
});
var couchpotato_request = $.ajax({
    url: wp.ajaxurl,
    type: "POST",
    dataType: 'HTML',
    data: {
        action: "cp_getMovies_template"
    }
});
var sickbeard_request = $.ajax({
    url: wp.ajaxurl,
    type: "POST",
    data: {
        action: 'sb_getTV_template'
    }
});
$(function() {
    couchpotato_request.done(function(msg) {
        /*$('#couchpotato .data').html('<div class="list-group couchpotato">');
        var time = false;
        for (var i in msg) {
            time = findReleaseDate(msg[i].library.info.release_date);
            console.log(time);
            $('#couchpotato .data').append('<a href="#" class="list-group-item' + (i > 2 ? ' hidden' : '') + '" target="_blank" data-imdb="' + msg[i].library.info.imdb + '">' +
                '<h4 class="list-group-item-heading" title="' + msg[i].library.info.original_title + '">' + msg[i].library.info.original_title + '</h4>' +
                '<p class="list-group-item-text"><time timestamp="' + msg[i].library.info.year + '">' + msg[i].library.info.year + '</time>' + (time ? '<span class="pull-right" title="' + time + '"><i class="glyphicon glyphicon-time"></i> ' + millisecondsToStr(time.getTime()) + '</span>' : '') + '</p>' +
                '</a>');
        }
        // 	<?php foreach ($movies as $k => $m): $imdb = new imdbAPI($m->library->info->imdb); ?>
        // 	  	<a href="http://www.imdb.com/title/<?php echo $m->library->info->imdb; ?>" class="list-group-item<?php echo $k > 2 ? ' hidden' : ''; ?>" target="_blank">
        // 			<h4 class="list-group-item-heading"><?php echo $m->library->info->original_title; ?></h4>
        // 			<p class="list-group-item-text"><time timestamp="<?php echo $m->library->info->year; ?>"><?php echo $m->library->info->year; ?></time><span class="pull-right"><i class="glyphicon glyphicon-time"></i> <time timestamp="<?php echo $imdb->released(); ?>" title="<?php echo $imdb->released(); ?>"><?php echo human_time_diff( strtotime($imdb->released()), current_time('timestamp') ); ?></time></span></p>
        // 	  	</a>
        // 	<?php endforeach; ?>
        // 	<a href="#more" class="list-group-item loadmore"><center><p class="lead nomargin"><?php _e('Load more...', 'madslundt'); ?></p></center></a>
        // </div>
        $('#couchpotato .data').append('<a href="#more" class="list-group-item loadmore"><center><p class="lead nomargin">' + wp.loadmore + '</p></center></a>');
        $('#couchpotato .data').append('</div>');
        // $('#couchpotato .data').html(str);*/
        $('#couchpotato .data').html(msg);
    });
    sickbeard_request.done(function(msg) {
        $('#sickbeard .data').html(msg);
    });
    sabnzbd_request.fail(function(msg) {
        console.log('fail');
        $('#sabnzbd .more').text("Couldn't connect to SABnzbd");
    });

    $('.thumbnail').on('click', '.loadmore', function(e) {
        e.preventDefault();
        $(this).parent().children('.hidden').removeClass('hidden');
        $(this).hide();
    });

    $('.thumbnail').on('click', '.js-update', function(e) {
        e.preventDefault();
        $(this).children('i').addClass('loader');
    });
    $('.couchpotato').on('click', '.list-group-item', function(e) {
        var id = $(this).data('id');
        var imdb = $(this).data('imdb');
        console.log('ID: ' + id);
        console.log('IMDB: ' + imdb);
    });
});

function findReleaseDate(release) {
    for (r in release) {
        if (release[r]) {
            return new Date(release[r] * 1000);
        }
    }
    return false;
}

function millisecondsToStr(milliseconds) {
    // TIP: to find current time in milliseconds, use:
    // var  current_time_milliseconds = new Date().getTime();

    function numberEnding(number) {
        return (number > 1) ? 's' : '';
    }
    var now = new Date().getTime();
    var end = '';
    if (now > milliseconds) {
        end = ' ago';
    }

    var temp = Math.abs(Math.floor((milliseconds - now) / 1000));
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years) + end;
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days) + end;
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours) + end;
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes) + end;
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds) + end;
    }
    return 'less than a second' + end; //'just now' //or other string you like;
}

/**
 * Ajax
	.request({
	    url: 'data.php',
	    method: 'post',
	    data: {
	        select: 'users',
	        orderBy: 'date'
	    },
	    headers: {
	        'custom-header': 'custom-value'
	    }
	})
	.done(function(result) {
	    console.log("done", result);
	})
	.fail(function(xhr) {
	    console.log("fail");
	})
	.always(function(xhr) {
	    console.log("always");
	});
 

var Ajax = {
    request: function(ops) {
        if (typeof ops == 'string') ops = {
            url: ops
        };
        ops.url = ops.url || '';
        ops.method = ops.method || 'get'
        ops.data = ops.data || {};
        var getParams = function(data, url) {
            var arr = [],
                str;
            for (var name in data) {
                arr.push(name + '=' + encodeURIComponent(data[name]));
            }
            str = arr.join('&');
            if (str != '') {
                return url ? (url.indexOf('?') < 0 ? '?' + str : '&' + str) : str;
            }
            return '';
        }
        var api = {
            host: {},
            process: function(ops) {
                var self = this;
                this.xhr = null;
                if (window.ActiveXObject) {
                    this.xhr = new ActiveXObject('Microsoft.XMLHTTP');
                } else if (window.XMLHttpRequest) {
                    this.xhr = new XMLHttpRequest();
                }
                if (this.xhr) {
                    this.xhr.onreadystatechange = function() {
                        if (self.xhr.readyState == 4 && self.xhr.status == 200) {
                            var result = self.xhr.responseText;
                            if (ops.json === true && typeof JSON != 'undefined') {
                                result = JSON.parse(result);
                            }
                            self.doneCallback && self.doneCallback.apply(self.host, [result, self.xhr]);
                        } else if (self.xhr.readyState == 4) {
                            self.failCallback && self.failCallback.apply(self.host, [self.xhr]);
                        }
                        self.alwaysCallback && self.alwaysCallback.apply(self.host, [self.xhr]);
                    }
                }
                if (ops.method == 'get') {
                    this.xhr.open("GET", ops.url + getParams(ops.data, ops.url), true);
                } else {
                    this.xhr.open(ops.method, ops.url, true);
                    this.setHeaders({
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-type': 'application/x-www-form-urlencoded'
                    });
                }
                if (ops.headers && typeof ops.headers == 'object') {
                    this.setHeaders(ops.headers);
                }
                setTimeout(function() {
                    ops.method == 'get' ? self.xhr.send() : self.xhr.send(getParams(ops.data));
                }, 20);
                return this;
            },
            done: function(callback) {
                this.doneCallback = callback;
                return this;
            },
            fail: function(callback) {
                this.failCallback = callback;
                return this;
            },
            always: function(callback) {
                this.alwaysCallback = callback;
                return this;
            },
            setHeaders: function(headers) {
                for (var name in headers) {
                    this.xhr && this.xhr.setRequestHeader(name, headers[name]);
                }
            }
        }
        return api.process(ops);
    }
}*/