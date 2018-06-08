$( function () {
    FastClick.attach( document.body );

    $( '.dropdown' ).on( 'click', function () {
        if ( $( this ).find( '.drop-icon' ).hasClass( 'icon-arrow-right' ) ) { //show
            $( this ).find( '.drop-icon' )
                .removeClass( 'icon-arrow-right' )
                .addClass( 'icon-arrow-down' )
            var dropcontent = $(this).data('drop')
            $( '[data-dropcontent="' + dropcontent + '"]').show()
        } else { //hide
            $( this ).find( '.drop-icon' )
                .removeClass( 'icon-arrow-down' )
                .addClass( 'icon-arrow-right' )
            var dropcontent = $( this ).data( 'drop' )
            $( '[data-dropcontent="' + dropcontent + '"]' ).hide()
        }
    } )
} );

// 进度条
; ( function ( $ ) {
    var Bar = function ( ele, opt ) {
        this.$element = ele,
            this.defaults = {
                'height': '20',
                'color': '#ffcc01',
                'textDecoration': 'none'
            },
            this.options = $.extend( {}, this.defaults, opt )
    }

    var template = function () {
        return `<div class="bar" style="height: {height}px;width: {width}px;border-radius: {radius}px;background: #fff;">
            <div class="value" style="width: 0%;height: {height}px;border-radius: {radius}px;background: {vcolor} "></div>
        </div>`
    }

    Bar.prototype = {
        init: function () {
            this.options = $.extend( this.options, { radius: this.options.height / 2 } )
            this.$element.append( util.format( template(), {
                height: this.options.height,
                width: this.options.width,
                radius: this.options.height / 2,
                vcolor: this.options.color
            } ) )
            if ( !this.options.width ) {
                this.$element.find( '.bar' ).css( {
                    width: '100%'
                } )
            }
        },
        setValue: function (v) {
            this.$element.find( '.value' ).css( {
                width: v + '%'
            })
        }
    }

    $.fn.bar = function ( options ) {
        var bar = new Bar( this, options )
        bar.init()
        return bar
    }
} )( jQuery );

var util = {
    //数据渲染
    render: function ( obj ) {
        for ( var key in obj ) {
            var ele = $( '[data-key="' + key + '"]' )
            if ( ele.length > 0 ) {
                if ( ele[0].tagName == 'INPUT' ) {
                    ele.val( obj[key] )
                } else {
                    ele.html( obj[key] )
                }
            }
        }
    },
    //模版渲染
    templateRender: function (id, data, ele) {
        var html = template( id, data );
        ele.html(html)
    },
    format: function ( str, param ) {
        var reg = /{([^{}]+)}/gm;
        return str.replace( reg, function ( match, name ) {
            return param[name];
        } );
    },
    toUtf8: function ( str ) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for ( i = 0; i < len; i++ ) {
            c = str.charCodeAt( i );
            if ( ( c >= 0x0001 ) && ( c <= 0x007F ) ) {
                out += str.charAt( i );
            } else if ( c > 0x07FF ) {
                out += String.fromCharCode( 0xE0 | ( ( c >> 12 ) & 0x0F ) );
                out += String.fromCharCode( 0x80 | ( ( c >> 6 ) & 0x3F ) );
                out += String.fromCharCode( 0x80 | ( ( c >> 0 ) & 0x3F ) );
            } else {
                out += String.fromCharCode( 0xC0 | ( ( c >> 6 ) & 0x1F ) );
                out += String.fromCharCode( 0x80 | ( ( c >> 0 ) & 0x3F ) );
            }
        }
        return out;
    }
}