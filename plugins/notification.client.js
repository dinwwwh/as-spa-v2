import xss from 'xss'
export default function ({$toast}, inject){
  inject('notification', {
    error: showErrorMessage,
    info: showInfoMessage,
    warning: showWarningMessage,
    success: showSuccessMessage,
  });

  function showErrorMessage(message, title = ''){
    $toast.show({
      type: 'danger',
      title: xss(title) || false,
      message: xss(message),
    });
  }

  function showInfoMessage(message, title = false){
    $toast.show({
      type: 'info',
      title: xss(title) || false,
      message: xss(message),
    });
  }

  function showWarningMessage(message, title = false){
    $toast.show({
      type: 'warning',
      title: xss(title) || false,
      message: xss(message),
    });
  }

  function showSuccessMessage(message, title = false){
    $toast.show({
      type: 'success',
      title: xss(title) || false,
      message: xss(message),
    });
  }
}
