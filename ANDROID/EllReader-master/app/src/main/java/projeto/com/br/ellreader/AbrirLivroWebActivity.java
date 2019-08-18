package projeto.com.br.ellreader;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.webkit.WebView;

public class AbrirLivroWebActivity extends AppCompatActivity {

    WebView webView;
    String Abrirpdf;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_abrir_livro_web);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        WebView webView = (WebView) findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        Intent intent = getIntent();
        Abrirpdf = intent.getStringExtra("AbrirPdf");

        String url =  getString(R.string.endServidor) + Abrirpdf;

        webView.loadUrl("https://drive.google.com/viewerng/viewer?embedded=true&url="+ url);

        Log.d("Abrirpdf",url);

    }

}
