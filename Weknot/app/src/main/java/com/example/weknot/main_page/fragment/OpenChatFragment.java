package com.example.weknot.main_page.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.databinding.DataBindingUtil;
import androidx.fragment.app.Fragment;

import com.example.weknot.R;
import com.example.weknot.databinding.NewsFeedFragmentBinding;
import com.example.weknot.databinding.OpenChatFragmentBinding;

public class OpenChatFragment extends Fragment {

    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    private String mParam1;
    private String mParam2;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    public static OpenChatFragment newInstance() {
        Bundle args = new Bundle();

        OpenChatFragment openChatFragment = new OpenChatFragment();
        openChatFragment.setArguments(args);
        return openChatFragment;
    }

    private OpenChatFragmentBinding binding;

    private View view;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        binding = DataBindingUtil.inflate(
                inflater, R.layout.open_chat_fragment, container, false);
        view = binding.getRoot();

        return view;
    }

    @Override
    public void onDetach() {
        super.onDetach();
    }
}
