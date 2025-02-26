
export const handleReportFunctionClick = ({ function_id, function_name, entry_mode, ...others }) => {
    const properties = {
      entry_mode,
      function_id,
      function_name,
      top_domain: window.location.host,
      ...others
    }
    if (window.AnalysysAgent) window.AnalysysAgent.track("function_click", properties)
  
  }
  
  
  export const handleReportButtonClick = ({ entry_mode, button_id, button_name, ...others }) => {
    const properties = {
      entry_mode,
      button_id,
      button_name,
      top_domain: window.location.host,
      ...others
    }
    if (window.AnalysysAgent) window.AnalysysAgent.track("button_click", properties)
  }