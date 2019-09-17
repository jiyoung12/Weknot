package com.example.weknot_android.view.navigator

import com.example.weknot_android.base.BaseNavigator

interface LoginNavigator : BaseNavigator {
    fun login()
    fun openSignUpActivity()
    fun openMainActivity()
}