// formatチェックで使用する正規表現です。必要に応じてファイルを分けたり、追加が可能です。
const ValidateSchema = {
  Number: {
    schema: /^[0-9]*$/,
    errorMessage: "は数字で入力してください",
  },
  NumberHyphen: {
    // eslint-disable-next-line no-useless-escape
    schema: /^[0-9\-]+$/,
    errorMessage: "に数字とハイフン以外が入力されています",
  },
  Hiragana: {
    schema: /^[ぁ-んー]+$/,
    errorMessage: "はひらがなで入力してください",
  },
  Mail: {
    // eslint-disable-next-line no-useless-escape
    schema: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    errorMessage: "は正しい形式で入力してください",
  },
}

// 必須チェック
function requireCheck(input) {
  let result
  let errorMessage
  if (input.value.length <= 0 || input.value === null) {
    errorMessage = input.name + "は必須です。"
    result = { valid: false }
  } else {
    result = { valid: true }
    errorMessage = ""
  }
  return { errorMessage, ...result }
}

// 長さチェック
function lengthCheck(input) {
  const minLength = input.length[0]
  const maxLength = input.length[1]
  let errorMessage
  let result
  if (input.value.length >= minLength && input.value.length <= maxLength) {
    result = { valid: true }
    errorMessage = ""
  } else {
    errorMessage =
      input.name +
      "は" +
      minLength +
      "文字以上" +
      maxLength +
      "文字以下で入力してください"
    result = { valid: false }
  }
  return { ...result, errorMessage }
}

// フォーマットチェック
function formatCheck(input) {
  const formatType = input.format
  let errorMessage
  let result
  if ((formatType && !input.value == "") || !input.value == null) {
    const validate = ValidateSchema[formatType].schema.test(input.value)
    if (validate) {
      result = { valid: true }
      errorMessage = ""
    } else {
      errorMessage = input.name + ValidateSchema[formatType].errorMessage
      result = { valid: false }
    }
  } else {
    result = { valid: true }
    errorMessage = ""
  }
  return { ...result, errorMessage }
}

// エラーを初期化するメソッド
function clearErrorMessage(input) {
  return (input.errorMessage = [])
}

// バリデーションメソッド
export const validation = (input) => {
  // 最初はエラーは0
  let errors = 0
  const result = input
  for (let key in input) {
    //エラーを初期化
    clearErrorMessage(result[key], errors)
    // 入力必須が設定されていた場合のみ実行
    if (input[key].require) {
      const requireCheckResult = requireCheck(result[key])
      if (requireCheckResult.valid != true) {
        result[key].errorMessage.push(requireCheckResult.errorMessage)
        errors++
      }
    }
    // 入力必須が設定されていて、長さチェックが設定されていた場合のみ実行
    if (input[key].length && input[key].require) {
      const lengthCheckResult = lengthCheck(result[key])
      if (lengthCheckResult.valid != true) {
        result[key].errorMessage.push(lengthCheckResult.errorMessage)
        errors++
      }
    }
    // フォーマットが設定されていた場合のみ実行
    if (input[key].format) {
      const formatCheckResult = formatCheck(result[key])
      if (formatCheckResult.valid != true) {
        result[key].errorMessage.push(formatCheckResult.errorMessage)
        errors++
      }
    }
    if (errors == 0) {
      clearErrorMessage(result[key], errors)
    }
  }
  if (errors === 0) {
    return { validStatus: true }
  }
  return { validStatus: false, input: { ...result } }
}

export const requestInput = (input) => {
  let result = {}
  for (let key in input) {
    result[key] = input[key].value
  }
  return result
}
