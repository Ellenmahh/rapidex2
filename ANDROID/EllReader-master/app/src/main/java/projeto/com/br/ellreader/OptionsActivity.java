package projeto.com.br.ellreader;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

public class OptionsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_options);
    }

    public void EstouLendo(View view) {
        Toast.makeText(this,"criar pagina estou lendo",Toast.LENGTH_SHORT).show();
    }

    public void novosLivros(View view) {
        Intent intent = new Intent (this,GridViewActivity.class);
        startActivity(intent);
    }
}
