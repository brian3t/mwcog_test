$(document).on("pagebeforecreate", function () {
    console.log(`1 page init done. loading template into #template`);
    $('#template').load('flex_common.html');
});

$(document).on('pageshow', ()=>{
    console.log(`2 page is shown`);
});

$(document).on('pagechange', ()=> {
    console.log(`3 page is changed`);
    let user = ls('user');
    if (user.is_flex){
        setTimeout(()=>$('#flex_incentive_joined_popup').popup('open'), 2000);
    } else {
        setTimeout(()=>$('#flex_incentive_invite_popup').popup('open'), 2000);
    }
});
