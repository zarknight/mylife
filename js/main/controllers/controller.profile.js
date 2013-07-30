'use strict';

function ProfileCtrl($scope) {

  function btns2default() {
    $scope.profileSaveDisplay = 'none';
    $scope.profileEditDisplay = 'block';
    $scope.passwordSaveDisplay = 'none';
    $scope.passwordChangeDisplay = 'block';

    $scope.profilePanelDisplay = 'block';
    $scope.passwordPanelDisplay = 'none';

    $scope.cancelDisplay = 'none';
  }

  function btns2editpro() {
    $scope.profileSaveDisplay = 'block';
    $scope.profileEditDisplay = 'none';
    $scope.passwordSaveDisplay = 'none';
    $scope.passwordChangeDisplay = 'none';

    $scope.profilePanelDisplay = 'block';
    $scope.passwordPanelDisplay = 'none';

    $scope.cancelDisplay = 'block';
  }

  function btns2changepwd() {
    $scope.profileSaveDisplay = 'none';
    $scope.profileEditDisplay = 'none';
    $scope.passwordSaveDisplay = 'block';
    $scope.passwordChangeDisplay = 'none';

    $scope.profilePanelDisplay = 'none';
    $scope.passwordPanelDisplay = 'block';

    $scope.cancelDisplay = 'block';

    $('#profile-pwd-section input').val('');
  }

  function clearAllErrorMsg() {
    $('.error-msg').empty().hide();
  }

  function showErrorMsg(el, msg) {
    clearAllErrorMsg();
    var emsg = $(el).parent().find('.error-msg');
    emsg.text(msg).show();
  }

  //-------------------------------------------------------------------
  $scope.WEB_ROOT = WEB_ROOT;
  btns2default();

  $scope.saveProfile = function() {
    btns2default();
  };

  $scope.editProfile = function() {
    btns2editpro();
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

  $scope.changePassword = function() {
    btns2changepwd();
  };

  $scope.cancel = function() {
    clearAllErrorMsg()
    btns2default();
  };

}
