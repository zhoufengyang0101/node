;
(function($) {
    $.delete = function(url, data, callback, cb) {
        $.ajax({
            url: url,
            type: "delete",
            contentType: "application/json",
            dataType: "json",
            data: data,
            success: function(msg) {
                callback(msg);
            },
            error: function(xhr, textstatus, thrown) {
                cb(thrown)
            }
        });
    };
})(jquery)