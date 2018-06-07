$( document ).on( "pageInit", "#page-cash-card", function ( e, id, page ) {
    var vm = new Vue( {
        el: '#page-cash-card',
        data: function () {
            return {
                banks: [
                    { name: "招商银行", code: "10001", desc: '2283' },
                    { name: "建设银行", code: "10002", desc: '2284' },
                    { name: "工商银行", code: "10003", desc: '2285' },
                    { name: "中国银行", code: "10004", desc: '2286' },
                    { name: "农业银行", code: "10005", desc: '2287' }
                ],
                select_bank: ""
            }
        },
        created() {
            this.select_bank = store.getQueryString( 'bankcode' ).toString();
            
        },
        watch: {
            select_bank: function ( val, oldVal ) {
                console.log( 'new: %s, old: %s', val, oldVal )
                if ( oldVal != '' ) {
                    store.bus.$emit('cash.withdraw.selectBank', _.where( this.banks, { code: val })[0])
                }
            }
        },
        methods: {
            addBank() {
                console.log(this.select_bank)
            }
        }
    } )
} );