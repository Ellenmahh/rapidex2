package projeto.com.br.ellreader;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;

import static projeto.com.br.ellreader.MainActivity.user;

/**
 * Created by 16165862 on 10/04/2017.
 */

public class LivroAdapter extends ArrayAdapter <Livro> {

    int resource;
    Integer idLivro;
    private LayoutInflater layinfla;


    public LivroAdapter(Context context, int resource, ArrayList<Livro> objects) {
        super(context, resource, objects);
        this.resource = resource;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        View v = convertView;

        if (v == null){

            LayoutInflater inflater = LayoutInflater.from(getContext());
            v = inflater.inflate(resource,null);
        }
        if (v == null)
        {
            v = layinfla.inflate(R.layout.modelo,parent,false);
        }

        final Livro livro  = getItem(position);


        ImageView imageView = (ImageView)v.findViewById(R.id.imgView);
        ImageView imageViewFavoritos;
        imageViewFavoritos = (ImageView) v.findViewById(R.id.favoritos);


        if(livro.getImagemCapa() !=null &&  !livro.getImagemCapa().isEmpty()) {

            String caminhoImg =  getContext().getString(R.string.endServidor) + livro.getImagemCapa();
            Log.d("caminhoImagem",caminhoImg);
            Picasso.with(getContext()).load(caminhoImg).into(imageView);

                if( livro.getFavoritos() != null && livro.getFavoritos()==1){
                    imageViewFavoritos.setImageResource(R.drawable.favoritos);
                    imageViewFavoritos.setTag(true);
                }else {
                    imageViewFavoritos.setImageResource(R.drawable.desfavoritado);
                    imageViewFavoritos.setTag(false);
                }
            }


        imageViewFavoritos.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(getContext(),"chegou"+livro.getId(), Toast.LENGTH_SHORT).show();
                idLivro = livro.getId();
                new Favoritos((ImageView) v).execute();
            }
        });

        return v;
    }

    private class Favoritos extends AsyncTask<String,Void,Void> {

        ImageView imageViewFavoritos;
        String server;

        public Favoritos (ImageView imageViewFavoritos){
            this.imageViewFavoritos = imageViewFavoritos;
        }


        @Override
        protected Void doInBackground(String... params) {
            server =  getContext().getString(R.string.endServidor)+ "AddFavoritos.php?id=" + idLivro+"&usuario="+user.getId();
            String json = HttpConnection.get(server);
            return null;
        }

        @Override
        protected void onPostExecute(Void aVoid) {
            super.onPostExecute(aVoid);

            if( (boolean)imageViewFavoritos.getTag() ) {

                imageViewFavoritos.setImageResource(R.drawable.desfavoritado);
                imageViewFavoritos.setTag(false);
            }else {
                imageViewFavoritos.setImageResource(R.drawable.favoritos);
                imageViewFavoritos.setTag(true);

            }


        }
    }


}
