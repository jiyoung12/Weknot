package com.example.weknot_android.widget.recyclerview.holder

import android.view.View
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.RecyclerView.ViewHolder
import com.example.weknot_android.databinding.SocialItemBinding

class SocialViewHolder(itemView: View) : ViewHolder(itemView) {
    val binding: SocialItemBinding = DataBindingUtil.bind(itemView)!!
}