package com.example.weknot_android.viewmodel

import android.app.Application
import androidx.lifecycle.MutableLiveData
import com.example.weknot_android.base.BaseViewModel
import com.example.weknot_android.network.comm.SignComm
import com.example.weknot_android.network.request.SignUpRequest
import com.example.weknot_android.view.navigator.SignUpNavigator

class SignUpViewModel(application: Application) : BaseViewModel<Any, SignUpNavigator>(application) {
    private val signComm = SignComm()

    var request = MutableLiveData<SignUpRequest>()

    fun signUp() {
        addDisposable(signComm.signUp(request.value!!), baseObserver)
    }

    fun onClickSignUp() {
        getNavigator().signUp()
    }

    override fun onRetrieveDataSuccess(data: Any) { }

    override fun onRetrieveBaseSuccess(message: String) {
        getNavigator().handleSuccess(message)
        getNavigator().openLoginActivity()
    }

    override fun onRetrieveError(throwable: Throwable) {
        getNavigator().handleError(throwable)
    }
}