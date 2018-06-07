$( document ).on( "pageInit", "#page-order-list", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-order-list',
        data: function () {
            return {
                orderlist: [],
                loading: false,
                search_content: ''
            }
        },
        created() {
            this.search_order_list();
        },
        mounted() {
            console.log( 'mounted' );
            var self = this;
            $.initPullToRefresh( '.pull-to-refresh-content' );
            $( document ).on( 'refresh', '.pull-to-refresh-content', function ( e ) {
                console.log( 'refresh' )
                $.pullToRefreshDone( '.pull-to-refresh-content' );
            } );

            //$.initInfiniteScroll('.infinite-scroll');
            $.attachInfiniteScroll( '.infinite-scroll' );
            $( document ).on( 'infinite', '.infinite-scroll', function () {
                console.log( 'infinite-scroll' );
                // 如果正在加载，则退出
                if ( self.loading ) return;
                // 设置flag
                self.loading = true;
                var last_order = self.orderlist[self.orderlist.length - 1]; //self.orderlist.pop();
                var last_order_no = last_order.order_no;
                self.search_order_list( last_order_no );
            } );
        },
        methods: {
            search_order_list( last_order_no ) {
                var self = this;
                var params = {
                    page_size: 20,
                    search_order_no: this.search_content
                }
                if ( last_order_no ) {
                    params['orderid'] = last_order_no
                }
                store.post( '/order/get_order_list', params, function ( data ) {
                    //console.log(data);
                    // _.each(data, function (value, index) {
                    //     self.orderlist.push(value)
                    // } );
                    if ( data.length == 0 || data.length < 20 ) {
                        $.detachInfiniteScroll( $( '.infinite-scroll' ) );
                        $( '#page-order-list' ).find( '.infinite-scroll-preloader' ).remove();
                    }
                    self.orderlist = self.orderlist.concat( data );
                    self.loading = false;
                } )
            },
            search() {
                this.orderlist = [];
                $.attachInfiniteScroll( '.infinite-scroll' );
                this.search_order_list();
            },
            show( list ) {
                store.set( 'order-detail', {
                    "created": moment( list.created * 1000 ).format( 'YYYY-MM-DD HH:mm:ss' ),//创建时间时间戳
                    "amount": list.amount,//金额
                    "subject": list.subject,//标题
                    "clerk_name": list.clerk_name,//如果是分店订单，显示店员名称，不是则为空
                    "id": list.id,//交易单号
                    "create_date": list.create_date,//创建时间格式化的
                    "order_no": list.order_no,//订单号
                    "transaction_no": list.transaction_no, //商户单号
                    "refund_status": list.refund_status, //退款状态
                    "pay_type": list.pay_type //支付方式
                } )
                $.router.loadPage( './show.html' );
            }
        }
    } )
} );