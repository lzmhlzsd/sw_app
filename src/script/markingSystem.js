;
( function ( $, window, document, undefined ) {
    var Marking = function ( ele, opt ) {
        this.$element = ele,
            this.defaults = {
                'height': 20,
                'width': 20,
                'spaceBetween': 2,
                'backgroundImageInitial': 'images/star_hollow.png', //鍥炬爣鍒濆鏍峰紡
                'backgroundImageOver': 'images/star_solid.png', //鐐瑰嚮鍚庡浘鏍�
                'num': 5, //鍥炬爣鏁伴噺
                'clickEnable': true,
                'havePoint': false, //鏄惁鏈夊皬鏁�
                'haveGrade': false, //鏄惁鏈夊垎鏁�
                'unit': '', //鍗曚綅鍐呭
                'grade': 0, //鍒嗘暟
            },
            this.options = $.extend( {}, this.defaults, opt )
    }
    //瀹氫箟Marking鐨勬柟娉�
    Marking.prototype = {
        setImages: function () {
            var htmlItem = '<div class="set_image_item"><img style="height:100%;" src="' + this.options.backgroundImageInitial + '" alt=""></div>';
            var htmlAll = '';
            for ( var i = 0; i < this.options.num; i++ ) {
                htmlAll = htmlItem + htmlAll;
            };
            var html = '<div class="set_image_all">' + htmlAll + '</div>';
            return this.$element.append( html );
        },
        //鍒濆鐘舵€�
        begin: function () {
            var that = this.$element;
            var This = this;
            var grade = this.options.grade;
            if ( This.options.haveGrade ) {
                that.append( '<span class="grade">' + grade + This.options.unit + '</span>' );
                that.find( '.grade' ).css( {
                    'display': 'inline-block',
                    'height': This.options.height + 'px',
                    'line-height': This.options.height + 'px',
                } )
            }
            console.log( This.options.height )
            that.find( '.set_image_item' ).css( {
                'height': This.options.height + 'px',
                'width': This.options.width + 'px',
            } )
            var htmlTop = '';
            console.log( Math.ceil( grade ) )
            for ( var i = 0; i < Math.ceil( grade ); i++ ) {
                htmlTop = htmlTop + '<div><img style="height:100%;" src="' + This.options.backgroundImageOver + '" alt=""></div>';
            }
            that.find( '.set_image_all' ).append( '<div class="set_image_top">' + htmlTop + '</div>' );
            that.find( '.set_image_top>div' ).css( {
                'height': This.options.height + 'px',
                'width': This.options.width + 'px',
            } )
            if ( ( This.options.havePoint ) && ( grade % 1 != 0 ) ) {
                that.find( '.set_image_top>div' ).last().css( {
                    'width': This.options.width * ( grade - Math.floor( grade ) ) + 'px',
                } )
            }
        },
        // 鐐瑰嚮鏀瑰彉鏄剧ず
        clickChangeAll: function () {
            var that = this.$element;
            var This = this;
            var grade = this.options.grade;
            that.find( '.set_image_item' ).click( function ( e ) {
                grade = $( this ).index() + 1
                // console.log(grade)
                that.find( '.set_image_top' ).remove()
                var htmlTop = '';
                for ( var i = 0; i <= $( this ).index(); i++ ) {
                    htmlTop = htmlTop + '<div><img style="height:100%;" src="' + This.options.backgroundImageOver + '" alt=""></div>';
                }
                that.find( '.set_image_all' ).append( '<div class="set_image_top">' + htmlTop + '</div>' );
                that.find( '.set_image_top>div' ).css( {
                    'height': This.options.height + 'px',
                    'width': This.options.width + 'px',
                    'margin-right': This.options.spaceBetween + 'px',
                } )
                // 鍒ゆ柇闇€瑕佸皬鏁�
                if ( This.options.havePoint ) {
                    var X1 = e.pageX - $( this ).offset().left;
                    console.log( X1 )
                    that.find( '.set_image_top>div' ).last().css( {
                        'width': X1 + 'px',
                    } )
                    grade = grade + X1 / This.options.width - 1;
                    grade = grade.toFixed( 1 )
                    // console.log(grade)  
                }
                // 娣诲姞鍒嗘暟
                if ( This.options.haveGrade ) {
                    that.find( '.grade' ).remove()
                    that.append( '<span class="grade">' + grade + This.options.unit + '</span>' );
                    that.find( '.grade' ).css( {
                        'display': 'inline-block',
                        'height': This.options.height + 'px',
                        'line-height': This.options.height + 'px',
                    } )
                }
            } )

        },
        // 娣诲姞鏍峰紡
        myCss: function () {
            $( '.set_image_item' ).parent().css( {
                'display': 'inline-block',
            } )
            $( '.set_image_item' ).css( {
                'margin-right': this.options.spaceBetween + 'px',
            } )
            $( '.set_image_top>div' ).css( {
                'margin-right': this.options.spaceBetween + 'px',
            } )
        }
    }
    //鍦ㄦ彃浠朵腑浣跨敤markingSystem瀵硅薄
    $.fn.markingSystem = function ( options ) {
        //鍒涘缓Beautifier鐨勫疄浣�
        var marking = new Marking( this, options );
        //璋冪敤鍏舵柟娉�
        marking.setImages();
        marking.begin();
        if ( marking.options.clickEnable ) {
            marking.clickChangeAll();
        }
        return marking.myCss();
    }
} )( jQuery, window, document );