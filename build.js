var watch = require( 'node-watch' );
var fs = require( "fs" );
var random = randomString( 8 );

console.log( 'build html starting......\n' )

var rootPath = './www/include/'
var include = {}
fs.readdir( rootPath, 'utf8', function ( err, files ) {
    if ( err ) {
        console.log( err );
        return;
    }

    //console.log( files )
    files.forEach( function ( name ) {
        include[name] = fs.readFileSync( rootPath + '/' + name, 'utf8' )
        // .replace( /\.css/g, '.css?v=' + random )
        // .replace( /\.js/g, '.js?v=' + random )
    } )

    buildhtml( './src/html/CRM', '../', function () {
        console.log( 'build html complete......\n' )
    } )   // params1: 处理页面的目录 params2: 相对路径 params3 callback
} );

function buildhtml( path, xpath, callback ) {
    fs.readdir( path, function ( err, files ) {
        if ( err ) {
            console.log( err );
            return;
        }
        files.forEach( function ( filename ) {
            if ( filename == '.DS_Store' ) {
                return;
            } else if ( filename.indexOf( '.html' ) > 0 ) {
                //console.log( 'this path is %s', path + '/' + filename )
                fs.readFile( path + '/' + filename, 'utf8', function ( err, data ) {
                    if ( err ) {
                        console.log( err );
                        return;
                    }
                    else {
                        var temphtml = data;
                        //查找替换字符串
                        for ( var item in include ) {
                            var f = item.split( '.' )[0]
                            var str = "<!--start:" + f + "-->([\\s\\S]*?)<!--end:" + f + "-->";
                            //console.log( str )
                            var reg = new RegExp( str, "g" );
                            //console.log( reg)
                            //var match = data.match( /<!--start:footer-->([\s\S]*?)<!--end:footer-->/g )
                            var result = reg.exec( temphtml )
                            //console.log(result)
                            if ( result.length > 0 ) {
                                var name = result[0].match( /<!--start:(\S*)-->/ )[1]
                                //console.log('name: %s', name)
                                var ninclude = include[name + '.html']
                                    .replace( /href="\.\//g, 'href="./' + xpath )
                                    .replace( /src="\.\//g, 'src="./' + xpath )
                                var h = '<!--start:' + name + '-->\n'
                                var f = '\n<!--end:' + name + '-->'
                                temphtml = temphtml.replace( reg, h + ninclude + f )
                            }
                        }
                        //console.log( 'newhtml: %s', temphtml)
                        console.log( 'page: %s \nbuild complete\n', path + '/' + filename )
                        fs.writeFile( path + '/' + filename, temphtml, 'utf8', function ( err ) {
                            if ( err ) {
                                console.log( err );
                                return;
                            }
                        } )
                        callback()
                    }
                } )
            } else {
                buildhtml( path + '/' + filename, xpath + '../', callback )
            }
        } )
    } )
}

function randomString( len ) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for ( i = 0; i < len; i++ ) {
        pwd += $chars.charAt( Math.floor( Math.random() * maxPos ) );
    }
    return pwd;
}