function addToBasket (channel) {
    if ($('input#'+channel).change) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/save',
            data: {"channel": channel},
            success: function (data) {
                $(".basket").empty();
                data.channel.forEach((channel, index) => {
                    $(".basket").append('<p>' + channel + '</p>');
                });

            }
        });
    }
}