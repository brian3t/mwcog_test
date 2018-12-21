$(document).on("pagecreate", function () {
    console.log(`page init done. loading template into #template`);
    $('#template').load('flex_common.html');
    let user = ls('user');
    if (user.is_flex){

    }
});