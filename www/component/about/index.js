$( document ).on( "pageInit", "#page-about-index", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-about-index',
        data: function () {
            return {}
        },
        created() {
        },
        methods: {
            about1() {
                store.set( 'iframe_title', '天工收银' );
                store.set( 'iframe_src', 'http://m.teegon.com/about/aboutus' );
                $.router.loadPage( './../iframe/index.html' );
            },
            // about2() {
            //     store.set( 'iframe_title', '关于商派' );
            //     store.set( 'iframe_src', 'https://mp.weixin.qq.com/s?__biz=MzA4NDQ0NDQ1Nw==&mid=401077917&idx=1&sn=850ea37c4a8bf83bc88d4d49cd4b6a6c&scene=1&srcid=0527F2UF7AQpdRdsPvThcRY3&key=8d8120cb97983fad35a3f214cb080c540023f74344cee53989d964326b1a4854d0a70049c3aa54936afc3ae0584e5957&ascene=0&uin=MjQ5NTgyODIyMQ%3D%3D&devicetype=iMac+MacBookPro7%2C1+OSX+OSX+10.11.4+build(15E65)&version=11020201&pass_ticket=tfF9VQW0TaKFlqUjBOe3Z0S33DpXlMeR8mmVVOSxwsAn%2BrKqTK4LMeXc%2FfZRCJ%2B%2F' );
            //     $.router.loadPage( './../iframe/index.html' );
            // },
            about3() {
                store.set( 'iframe_title', '隐私保护条款' );
                store.set( 'iframe_src', 'http://m.teegon.com/about/privacy' );
                $.router.loadPage( './../iframe/index.html' );
            },
            // about4() {
            //     store.set( 'iframe_title', '服务协议' );
            //     store.set( 'iframe_src', 'https://mafuh5.teegon.com/tools' );
            //     $.router.loadPage( './../iframe/index.html' );
            // }
        }
    } )
} );