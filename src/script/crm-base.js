$( function () {
    // FastClick.attach( document.body );

    $( '.dropdown' ).on( 'click', function () {
        if ( $( this ).find( '.drop-icon' ).hasClass( 'icon-arrow-right' ) ) { //show
            $( this ).find( '.drop-icon' )
                .removeClass( 'icon-arrow-right' )
                .addClass( 'icon-arrow-down' )
            var dropcontent = $( this ).data( 'drop' )
            $( '[data-dropcontent="' + dropcontent + '"]' ).show()
        } else { //hide
            $( this ).find( '.drop-icon' )
                .removeClass( 'icon-arrow-down' )
                .addClass( 'icon-arrow-right' )
            var dropcontent = $( this ).data( 'drop' )
            $( '[data-dropcontent="' + dropcontent + '"]' ).hide()
        }
    } )

    $( '.drop-search' ).on( 'click', function () {
        $( '.drop-search-content' ).hide()
        var dropcontent = $( this ).data( 'drop' )
        $( '[data-dropcontent="' + dropcontent + '"]' ).show()
    } )

    $( '.cancle-search' ).on( 'click', function () {
        $( this ).parents( '.drop-search-content' ).hide()
    } )

    $( '.group-drop .group-drop-item' ).on( 'click', function () {
        if ( $( this ).parent().find( '.icon-arrow-down' ).length > 0 ) {
            $( this ).parent().find( '.icon-arrow-down' )
                .addClass( 'icon-arrow-up' )
                .removeClass( 'icon-arrow-down' )
            $( this ).parent().addClass( 'open' )
        } else {
            $( this ).parent().find( '.icon-arrow-up' )
                .addClass( 'icon-arrow-down' )
                .removeClass( 'icon-arrow-up' )
            $( this ).parent().removeClass( 'open' )
        }
    } )
    // $( '.cancle-modal' ).on( 'click', function () {
    //     var modal = $( this ).data( 'modal' )
    //     util.hideModal(modal)
    // } )

    // var canScroll = false
    // $( ".modal" ).on( 'touchmove', function ( e ) {
    //     if ( !canScroll ) {
    //         e.preventDefault()
    //     }
    // } )
} );

// 进度条
; ( function ( $ ) {
    var Bar = function ( ele, opt ) {
        this.$element = ele
        this.defaults = {
            height: '20',
            color: '#ffcc01',
            background: '#fff'
        }
        this.options = $.extend( {}, this.defaults, opt )
    }

    var template = function () {
        return `<div class="bar" style="height: {height}px;width: {width}px;border-radius: {radius}px;background-color: {background};">
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
                vcolor: this.options.color,
                background: this.options.background
            } ) )
            if ( !this.options.width ) {
                this.$element.find( '.bar' ).css( {
                    width: '100%'
                } )
            }
        },
        setValue: function ( v ) {
            this.$element.find( '.value' ).css( {
                width: v
            } )
        }
    }

    $.fn.bar = function ( options ) {
        var bar = new Bar( this, options )
        bar.init()
        return bar
    }
} )( jQuery );

// 按钮组
; ( function ( $ ) {
    var ButtonTab = function ( ele, opt ) {
        this.$element = ele
        this.defaults = {
            width: 80,
            color: '#ffcc01',
            multiple: false,          // 是否多选
            buttons: [
                { id: 0, text: '按钮一' },
                { id: 1, text: '按钮二' },
                { id: 2, text: '按钮三' },
                { id: 3, text: '按钮四' },
                { id: 4, text: '按钮五' }
            ],
            onchange: null
        }
        this.options = $.extend( {}, this.defaults, opt )
    }

    var template = function ( data ) {
        var btn = `<div class="btn-checker clearfix">`
        for ( var i = 0; i < data.length; i++ ) {
            btn += util.format( `<div class="btn-checker-item" data-value="{id}">{text}</div>`, {
                id: data[i].id,
                text: data[i].text
            } )
        }
        btn += `</div>`
        return btn
    }

    ButtonTab.prototype = {
        init: function () {
            var self = this
            this.$element.append( template( this.options.buttons ) )

            this.$element.find( '.btn-checker-item' ).css( {
                //'width': this.options.width + 'px',
                'min-width': '60px',
                'padding': '0 5px',
                'height': '26px',
                'margin': '0 5px 5px 0',
                'border': '1px solid #cdcdcd',
                'text-align': 'center',
                'font-size': '12px',
                'line-height': '26px',
                'float': 'left',
                'position': 'relative'
            } )

            this.$element.find( '.btn-checker-item' ).on( 'click', function () {
                if ( self.options.multiple ) {
                    if ( $( this ).hasClass( 'active' ) ) {
                        $( this ).removeClass( 'active' )
                    } else {
                        $( this ).addClass( 'active' )
                    }
                } else {
                    if ( $( this ).hasClass( 'active' ) ) {
                        $( this ).removeClass( 'active' )
                    } else {
                        self.$element.find( '.btn-checker-item' ).removeClass( 'active' )
                        $( this ).addClass( 'active' )
                    }
                }
                if ( self.options.onchange ) {
                    self.options.onchange( self.getValue() )
                }
            } )
            return this
        },
        setValue: function ( data ) {
            if ( this.options.multiple ) {
                if ( data instanceof Array ) {
                    var ele = this.$element.find( '.btn-checker-item' )
                    ele.each( function () {
                        if ( data.indexOf( $( this ).data( 'value' ) ) > -1 ) {
                            $( this ).addClass( 'active' )
                        }
                    } )
                } else {
                    console.error( 'ButtonTab method setValue error: the multiple is true, params must be Array' )
                }
            } else {
                if ( new Number( data ) instanceof Number ) {
                    var ele = this.$element.find( '.btn-checker-item' )
                    ele.each( function () {
                        if ( $( this ).data( 'value' ) == data ) {
                            $( this ).addClass( 'active' )
                        }
                    } )
                } else {
                    console.error( 'ButtonTab method setValue error: the multiple is false, params must be Number' )
                }
            }
            return this
        },
        getValue: function () {
            if ( this.options.multiple ) {
                var select = []
                var ele = this.$element.find( '.btn-checker-item' )
                ele.each( function () {
                    if ( $( this ).hasClass( 'active' ) ) {
                        select.push( $( this ).data( 'value' ) )
                    }
                } )
            } else {
                var select = this.$element.find( '.btn-checker-item.active' ).data( 'value' )
            }
            return select
        },
        loadData: function ( data ) {
            this.options.buttons = data
            this.$element.empty()
            this.init()
            return this
        }
    }
    $.fn.buttonTab = function ( options ) {
        var buttonTab = new ButtonTab( this, options )
        buttonTab.init()
        return buttonTab
    }
} )( jQuery );

// 表格
; ( function ( $ ) {
    var Table = function ( ele, opt ) {
        this.$element = ele
        this.defaults = {
            // cols: [
            //     { filed: 'filed0', width: '15%', title: '' },
            //     { filed: 'filed1', width: '15%', format: function ( v ) { return v + '%' }, title: '金额' },
            //     { filed: 'filed2', width: '15%', title: '占比' },
            //     { filed: 'filed3', width: '15%', title: '单数' },
            //     { filed: 'filed4', width: '15%', title: '客单价' },
            //     { filed: 'filed5', width: '25%', title: '客单件' }
            // ],
            // data: [
            //     { filed0: '普卡', filed1: 199999, filed2: '16.0', filed3: 352, filed4: 1999, filed5: 1.2 }
            // ]
            cols: [],
            data: []
        }
        this.options = $.extend( {}, this.defaults, opt )
    }
    var template_thead = function ( cols ) {
        var html = `<table class="sw-table"><thead><tr>`
        for ( var i = 0; i < cols.length; i++ ) {
            html += `<th style="width:` + cols[i].width + `">` + cols[i].title + `</th>`
        }
        html += '</tr></thead><tbody></tbody></table>'
        return html
    }

    var template_tbody = function ( data, that ) {
        var html = ``
        for ( var i = 0; i < data.length; i++ ) {
            html += `<tr>`
            for ( var j = 0; j < that.options.cols.length; j++ ) {
                if ( typeof that.options.cols[j].format != 'undefined' ) {
                    html += `<td>` + that.options.cols[j].format( data[i][that.options.cols[j].filed] ) + `</td>`
                } else {
                    html += `<td>` + data[i][that.options.cols[j].filed] + `</td>`
                }

            }
            html += `</tr>`
        }
        return html
    }


    Table.prototype = {
        init: function () {
            var self = this
            this.$element.append( template_thead( this.options.cols ) )

            this.setData( this.options.data )
        },
        setData: function ( data ) {
            this.$element.find( 'tbody' ).html( template_tbody( data, this ) )
        }
    }
    $.fn.table = function ( options ) {
        var table = new Table( this, options )
        table.init()
        return table
    }
} )( jQuery );

// fixedTable
; ( function ( $ ) {
    var SwFixedTable = function ( ele, opt ) {
        this.$element = ele
        this.width = 0
        this.defaults = {
            // cols: [
            //     { filed: 'filed0', width: 100, title: '' },
            //     { filed: 'filed1', width: 100, format: function ( v ) { return v + '%' }, title: '金额' },
            //     { filed: 'filed2', width: 100, title: '占比' },
            //     { filed: 'filed3', width: 100, title: '单数' },
            //     { filed: 'filed4', width: 100, title: '客单价' },
            //     { filed: 'filed5', width: 100, title: '客单件' }
            // ],
            // data: [
            //     { filed0: '普卡', filed1: 199999, filed2: '16.0', filed3: 352, filed4: 1999, filed5: 1.2 },
            //     { filed0: '普卡', filed1: 199999, filed2: '16.0', filed3: 352, filed4: 1999, filed5: 1.2 },
            //     { filed0: '普卡', filed1: 199999, filed2: '16.0', filed3: 352, filed4: 1999, filed5: 1.2 },
            //     { filed0: '普卡', filed1: 199999, filed2: '16.0', filed3: 352, filed4: 1999, filed5: 1.2 },
            //     { filed0: '普卡', filed1: 199999, filed2: '16.0', filed3: 352, filed4: 1999, filed5: 1.2 }
            // ]
            cols: [],
            data: []
        }
        this.options = $.extend( {}, this.defaults, opt )
    }
    //表头
    var fixed_table_header_wraper = function ( cols, that ) {
        var html = `<div class="fixed-table_header-wraper">
                        <table class="fixed-table_header" cellspacing="0" cellpadding="0" border="0" style="width: `+ that.width + `px;">
                            <thead><tr>`
        for ( var i = 0; i < cols.length; i++ ) {
            if ( i == 0 ) {
                html += `<th style="width:` + cols[i].width + `px;" data-fixed="true"><div class="table-cell">` + cols[i].title + `</div></th>`
            } else {
                html += `<th style="width:` + cols[i].width + `px;"><div class="table-cell">` + cols[i].title + `</div></th>`
            }

        }
        html += '</tr></thead></table></div>'
        return html
    }
    //表格内容
    var fixed_table_body_wraper = function ( data, that ) {
        var html = `<div class="fixed-table_body-wraper">
                        <table class="fixed-table_body" cellspacing="0" cellpadding="0" border="0" style="width: `+ that.width + `px;">
                            <tbody>`
        for ( var i = 0; i < data.length; i++ ) {
            html += `<tr>`
            for ( var j = 0; j < that.options.cols.length; j++ ) {
                if ( typeof that.options.cols[j].format != 'undefined' ) {
                    html += `<td style="width:` + that.options.cols[j].width + `px;"><div class="table-cell">` + that.options.cols[j].format( data[i][that.options.cols[j].filed] ) + `</div></td>`
                } else {
                    html += `<td style="width:` + that.options.cols[j].width + `px;"><div class="table-cell">` + data[i][that.options.cols[j].filed] + `</div></td>`
                }

            }
            html += `</tr>`
        }
        html += `</tbody></table></div>`
        return html
    }
    //固定列
    var fixed_table_fixed = function ( cols, data, that ) {
        var html = `<div class="fixed-table_fixed fixed-table_fixed-left">
                        <div class="fixed-table_header-wraper">
                            <table class="fixed-table_header" cellspacing="0" cellpadding="0" border="0">
                                <thead><tr>`

        html += `<th style="width:` + cols[0].width + `px;"><div class="table-cell">` + cols[0].title + `</div></th>`

        html += `</tr></thead></table></div>`
        html += `<div class="fixed-table_body-wraper">
                    <table class="fixed-table_body" cellspacing="0" cellpadding="0" border="0">
                        <tbody>`
        for ( var i = 0; i < data.length; i++ ) {
            html += `<tr>`
            html += `<td style="width:` + that.options.cols[0].width + `px;"><div class="table-cell">` + data[i][that.options.cols[0].filed] + `</div></td>`
            html += `</tr>`
        }

        html += `</tbody></table></div></div>`
        return html
    }



    SwFixedTable.prototype = {
        init: function () {
            if ( this.options.cols.length == 0 ) {
                console.error( 'the swfixedtable options cols is null' )
                return
            }
            //计算总宽度
            this.width = 0
            for ( var k = 0; k < this.options.cols.length; k++ ) {
                this.width += this.options.cols[k].width
            }
            this.$element.append( `<div class="fixed-table-box row-col-fixed">` + fixed_table_header_wraper( this.options.cols, this ) +
                fixed_table_body_wraper( this.options.data, this ) +
                fixed_table_fixed( this.options.cols, this.options.data, this ) + `</div>` )

            $( ".fixed-table-box" ).fixedTable();
        },
        setData: function ( data ) {
            this.$element.empty();
            this.options.data = data;
            this.init()
        }
    }

    $.fn.swFixedTable = function ( options ) {
        var swFixedTable = new SwFixedTable( this, options )
        swFixedTable.init( 0 )
        return swFixedTable
    }
} )( jQuery );

// switch
; ( function ( $ ) {
    var SwitchBtn = function ( ele, opt ) {
        this.$element = ele
        this.width = 0
        this.defaults = {
            trueValue: 1,
            falseValue: 0,
            openText: '开启',
            closeText: '关闭'
        }
        this.options = $.extend( {}, this.defaults, opt )
    }
    var template = function ( options ) {
        return util.format( `<span class="sw-switch sw-switch-large sw-switch-checked">
                                <input type="hidden" value="true">
                                <span class="sw-switch-inner">
                                    <span>{openText}</span>
                                </span>
                            </span>`, options )
    }

    SwitchBtn.prototype = {
        init: function () {
            var self = this
            this.$element.append( template( this.options ) )
            this.$element.find( '.sw-switch' ).on( 'click', function () {
                if ( $( this ).hasClass( 'sw-switch-checked' ) ) {
                    $( this ).removeClass( 'sw-switch-checked' )
                    $( this ).find( 'input' ).val( self.options.falseValue )
                    $( this ).find( '.sw-switch-inner span' ).html( self.options.closeText )
                } else {
                    $( this ).addClass( 'sw-switch-checked' )
                    $( this ).find( 'input' ).val( self.options.trueValue )
                    $( this ).find( '.sw-switch-inner span' ).html( self.options.openText )
                }
                if ( self.options.onchange ) {
                    self.options.onchange( $( this ).find( 'input' ).val() )
                }
            } )
        }
    }

    $.fn.switchBtn = function ( options ) {
        var switchBtn = new SwitchBtn( this, options )
        switchBtn.init()
        return switchBtn
    }
} )( jQuery );

// radio
; ( function () {
    var RadioGroup = function ( ele, opt ) {
        this.$element = ele
        this.onchange = $.noop
        this.defaults = {
            data: [
                { label: '选项一', value: 1 },
                { label: '选项二', value: 2 },
                { label: '选项三', value: 3 },
                { label: '选项四', value: 4 },
                { label: '选项五', value: 5 }
            ]
        }
        this.options = $.extend( {}, this.defaults, opt )
    }

    var template = function ( data, that ) {
        var html = `<div class="weui-cells_checkbox" style="display: flex;flex-wrap: wrap;">`
        for ( var i = 0; i < data.length; i++ ) {
            if ( i == 0 ) {
                html += `<label class="weui-check__label" style="display: flex;align-items: center;margin: 0 10px 10px 0;">
                        <input type="radio" name="{name}" value="` + data[i].value + `" class="weui-check" checked="checked">
                        <i class="weui-icon-checked"></i>
                        <span>` + data[i].label + `</span>
                    </label>`
            } else {
                html += `<label class="weui-check__label" style="display: flex;align-items: center;margin: 0 10px 10px 0;">
                        <input type="radio" name="{name}" value="` + data[i].value + `" class="weui-check">
                        <i class="weui-icon-checked"></i>
                        <span>` + data[i].label + `</span>
                    </label>`
            }
        }
        html += `</div>`
        return html
    }

    RadioGroup.prototype = {
        init: function () {
            var self = this
            this.$element.append( util.format( template( this.options.data ), {
                name: 'radio_' + this.$element[0].id
            } ) )

            this.$element.find( 'input' ).change( function () {
                if ( self.options.onchange ) {
                    self.options.onchange( $( 'input[name="radio_' + self.$element[0].id + '"]:checked' ).val() )
                }
            } )
        }
    }

    $.fn.radioGroup = function ( options ) {
        var radioGroup = new RadioGroup( this, options )
        radioGroup.init()
        return radioGroup
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
    templateRender: function ( id, data, ele ) {
        var html = template( id, data );
        ele.html( html )
    },
    templateRenderAppend: function ( id, data, ele ) {
        var html = template( id, data );
        ele.append( html )
    },
    templateRenderInsertBefore: function ( id, data, ele ) {
        var html = template( id, data );
        $( html ).insertBefore( ele );
    },
    showModal: function ( modal ) {
        $( '[data-modal="' + modal + '"]' ).addClass( 'open' )
        $( '[data-modalcontent="' + modal + '"]' ).addClass( 'open' )
    },
    hideModal: function ( modal ) {
        $( '[data-modal="' + modal + '"]' ).removeClass( 'open' )
        $( '[data-modalcontent="' + modal + '"]' ).removeClass( 'open' )
    },
    //字符串格式化
    format: function ( str, param ) {
        var reg = /{([^{}]+)}/gm;
        return str.replace( reg, function ( match, name ) {
            return param[name];
        } );
    },
    //数字转千分位
    num2Money: function ( str ) {
        //console.log('num2Money params is: %s', str)
        if ( typeof str != 'undefined' && new Number( str ) instanceof Number ) {
            return str.toString().replace( /\d{1,3}(?=(\d{3})+$)/g, function ( s ) {
                return s + ','
            } )
        } else {
            console.error( 'num2Money error, this params str is undefined' )
            return 'undefined'
        }

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
    },
    getForm: function ( ele ) {
        var data = {}
        var fileds = $( ele ).find( '.form-filed' )
        for ( var i = 0; i < fileds.length; i++ ){
            data[$( fileds[i] ).attr( 'name' )] = $( fileds[i] ).val()
        }
        return data
    }
}