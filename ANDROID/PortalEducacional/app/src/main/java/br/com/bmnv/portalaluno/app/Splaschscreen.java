package br.com.bmnv.portalaluno.app;

import android.app.Activity;
import android.content.Intent;
import android.graphics.PixelFormat;
import android.os.Bundle;
import android.view.Window;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.LinearLayout;

/**
 * Created by 16165882 on 29/05/2017.
 */

public class Splaschscreen extends Activity{
    public void onAttachedToWindow(){
        super.onAttachedToWindow();
        Window window = getWindow();
        window.setFormat(PixelFormat.RGBA_8888);
    }

    Thread splashTread;

    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        this.requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_splashscreen);
        StartAnimations();
    }

    private  void StartAnimations(){
        Animation animation = AnimationUtils.loadAnimation(this,R.anim.alpha);
        animation.reset();
        LinearLayout linearLayout = (LinearLayout) findViewById(R.id.lin_lay);
        linearLayout.clearAnimation();
        linearLayout.startAnimation(animation);

        Animation anim = AnimationUtils.loadAnimation(this,R.anim.translate);
        animation.reset();
        ImageView iv = (ImageView) findViewById(R.id.splash);
        iv.clearAnimation();
        iv.startAnimation(anim);

        splashTread = new Thread(){
            @Override
            public void run(){
                try{
                    int waited = 0;

                    while (waited < 5000){
                        sleep(100);
                        waited +=100;
                    }

                    Intent intent = new Intent(Splaschscreen.this, MainActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
                    startActivity(intent);
                    Splaschscreen.this.finish();
                }catch (InterruptedException e){

                }finally {
                    Splaschscreen.this.finish();
                }
            }
        };
        splashTread.start();

    }



}
