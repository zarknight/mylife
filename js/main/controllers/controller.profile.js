'use strict';

function ProfileCtrl($scope) {
  var HIDE = 'none', SHOW = '';

  $scope.WEB_ROOT = WEB_ROOT;

  init();

  //------------------------------------------------------------------
  function btns2default() {
    $scope.profileSaveDisplay = HIDE;
    $scope.profileEditDisplay = SHOW;
    $scope.passwordSaveDisplay = HIDE;
    $scope.passwordChangeDisplay = SHOW;
    $scope.profilePanelDisplay = SHOW;
    $scope.passwordPanelDisplay = HIDE;
    $scope.cancelDisplay = HIDE;
  }

  function btns2editpro() {
    $scope.profileSaveDisplay = SHOW;
    $scope.profileEditDisplay = HIDE;
    $scope.passwordSaveDisplay = HIDE;
    $scope.passwordChangeDisplay = HIDE;
    $scope.profilePanelDisplay = SHOW;
    $scope.passwordPanelDisplay = HIDE;
    $scope.cancelDisplay = SHOW;
  }

  function btns2changepwd() {
    $scope.profileSaveDisplay = HIDE;
    $scope.profileEditDisplay = HIDE;
    $scope.passwordSaveDisplay = SHOW;
    $scope.passwordChangeDisplay = HIDE;
    $scope.profilePanelDisplay = HIDE;
    $scope.passwordPanelDisplay = SHOW;
    $scope.cancelDisplay = SHOW;

    $('#profile-pwd-section input').val('');
  }

  function clearAllErrorMsg() {
    $('.error-msg').empty().hide();
  }

  function showErrorMsg(el, msg) {
    clearAllErrorMsg();
    $(el).parent().find('.error-msg').text(msg).show();
  }

  function init() {
    $scope.editorLabelDisplay = SHOW;
    $scope.editorDisplay = HIDE;

    btns2default();

    $scope.firstname = "Kevin";
    $scope.lastname = "Zhang";
    $scope.birthyear = "1983";
    $scope.birthmonth = "1";
    $scope.birthday = "22";
    $scope.email = "zarknight@gmail.com";
  }

  //-------------------------------------------------------------------
  $scope.saveProfile = function() {
    btns2default();
    $scope.editorLabelDisplay = SHOW;
    $scope.editorDisplay = HIDE;

  };

  $scope.editProfile = function() {
    btns2editpro();
    $scope.editorLabelDisplay = HIDE;
    $scope.editorDisplay = SHOW;
  };

  $scope.changePassword = function() {
    btns2changepwd();
  };

  $scope.cancel = function() {
    clearAllErrorMsg()
    btns2default();
  };

  $scope.savePassword = function() {
    var oldpass = $.trim($('#old-pwd').val());
    var newpass = $.trim($('#new-pwd').val());
    var rptpass = $.trim($('#rep-pwd').val());

    if (oldpass == "") {
      showErrorMsg($('#old-pwd'), "please fill your old password");
      return;
    }

    if (newpass == "") {
      showErrorMsg($('#new-pwd'), "please fill your new password");
      return;
    }

    if (newpass != rptpass) {
      showErrorMsg($('#rep-pwd'), "your new password you filled are not correct");
      return;
    }

    clearAllErrorMsg();

    $.post(WEB_ROOT + '/index.php/user/changePassword', {
      'oldpass': oldpass,
      'newpass': newpass
    }, function(resp) {
      //...

      btns2default();
    });
  };

}
