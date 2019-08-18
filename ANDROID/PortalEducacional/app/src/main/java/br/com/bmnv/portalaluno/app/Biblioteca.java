package br.com.bmnv.portalaluno.app;

import android.content.res.Resources;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.TypedValue;
import android.view.View;

import com.google.android.gms.appindexing.Action;
import com.google.android.gms.appindexing.AppIndex;
import com.google.android.gms.appindexing.Thing;
import com.google.android.gms.common.api.GoogleApiClient;

import java.util.ArrayList;
import java.util.List;

public class Biblioteca extends AppCompatActivity {

    private RecyclerView recyclerView;
    private AlbumsAdapter adapter;
    private List<Album> albumList;
    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */
    private GoogleApiClient client;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_biblioteca);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initCollapsingToolbar();

        recyclerView = (RecyclerView) findViewById(R.id.recycler_view);

        albumList = new ArrayList<>();
        adapter = new AlbumsAdapter(this, albumList);

        RecyclerView.LayoutManager mLayoutManager = new GridLayoutManager(this, 2);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.addItemDecoration(new GridSpacingItemDecoration(2, dpToPx(10), true));
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(adapter);


        prepareAlbums();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client = new GoogleApiClient.Builder(this).addApi(AppIndex.API).build();
    }

    /**
     * Initializing collapsing toolbar
     * Will show and hide the toolbar title on scroll
     */
    private void initCollapsingToolbar() {
        final CollapsingToolbarLayout collapsingToolbar = (CollapsingToolbarLayout) findViewById(R.id.collapsing_toolbar);
        collapsingToolbar.setTitle(" ");
        AppBarLayout appBarLayout = (AppBarLayout) findViewById(R.id.appbar);
        appBarLayout.setExpanded(true);

        // hiding & showing the title when toolbar expanded & collapsed
        appBarLayout.addOnOffsetChangedListener(new AppBarLayout.OnOffsetChangedListener() {
            boolean isShow = false;
            int scrollRange = -1;

            @Override
            public void onOffsetChanged(AppBarLayout appBarLayout, int verticalOffset) {
                if (scrollRange == -1) {
                    scrollRange = appBarLayout.getTotalScrollRange();
                }
                if (scrollRange + verticalOffset == 0) {
                    collapsingToolbar.setTitle("Biblioteca Virtual");
                    isShow = true;
                } else if (isShow) {
                    collapsingToolbar.setTitle("");
                    isShow = false;
                }
            }
        });
    }

    /**
     * Adding few albums for testing
     */
    private void prepareAlbums() {
        int[] covers = new int[]{
                R.drawable.a_ultima_carta_do_tenente,
                R.drawable.diario_de_um_banana,
                R.drawable.eu_consigo_emagrecer,
                R.drawable.evolucao_dos_bichos,
                R.drawable.harry_potter,
                R.drawable.monty_python,
                R.drawable.o_velho_e_o_mar,
                R.drawable.stephen_king_just_after_sunset,
                R.drawable.voce_pode_realizar_seu_sonho,
                R.drawable.mysql,
                R.drawable.java,
                R.drawable.php,
                R.drawable.leigos,
                R.drawable.auto,
                R.drawable.adm,
                R.drawable.jsjq,
                R.drawable.html_css,
                R.drawable.so_c,
                R.drawable.c_sharp,
                R.drawable.elementos,
                R.drawable.introducao_dns,
                R.drawable.android,

        };

        Album a = new Album("A ultima carta do tenente","Drama", covers[0]);
        albumList.add(a);

        a = new Album("Diario de um Banana","Comédia", covers[1]);
        albumList.add(a);

        a = new Album("Eu consigo emagrecer","Drama", covers[2]);
        albumList.add(a);

        a = new Album("Evolução dos bichos","Comédia", covers[3]);
        albumList.add(a);

        a = new Album("Harry Potter","Romance", covers[4]);
        albumList.add(a);

        a = new Album("Monty Python","Terror", covers[5]);
        albumList.add(a);

        a = new Album("O velho e o mar","Drama", covers[6]);
        albumList.add(a);

        a = new Album("Just after sunset","Terror", covers[7]);
        albumList.add(a);

        a = new Album("Você pode realizar seu sonho","Drama", covers[8]);
        albumList.add(a);

        a = new Album("MySql:Guia do Programador","Informática", covers[9]);
        albumList.add(a);

        a = new Album("Java In a Nutshell","Informática", covers[10]);
        albumList.add(a);

        a = new Album("PHP 6 and MySql 5","Informática", covers[11]);
        albumList.add(a);

        a = new Album("Eletrônica para leigos","Eletrônica", covers[12]);
        albumList.add(a);

        a = new Album("Desenho Técnico e AutoCad","Desenho Técnico", covers[13]);
        albumList.add(a);

        a = new Album("Negociação e Administração de conflitos ","Administração", covers[14]);
        albumList.add(a);

        a = new Album("JavaScript & JQuery","Informática", covers[15]);
        albumList.add(a);

        a = new Album("HTML5 and CSS3","Informática", covers[16]);
        albumList.add(a);

        a = new Album("C Programming Language","Informática", covers[17]);
        albumList.add(a);

        a = new Album("C# 5.0 ","Informática", covers[18]);
        albumList.add(a);

        a = new Album("Eletrônica Digital","Eletrônica", covers[19]);
        albumList.add(a);

        a = new Album("Introdução ao DNS ","Informática", covers[20]);
        albumList.add(a);

        a = new Album("Xamarin Forms","Informática", covers[21]);
        albumList.add(a);

        adapter.notifyDataSetChanged();
    }

    /**
     * ATTENTION: This was auto-generated to implement the App Indexing API.
     * See https://g.co/AppIndexing/AndroidStudio for more information.
     */
    public Action getIndexApiAction() {
        Thing object = new Thing.Builder()
                .setName("Main Page") // TODO: Define a title for the content shown.
                // TODO: Make sure this auto-generated URL is correct.
                .setUrl(Uri.parse("http://[ENTER-YOUR-URL-HERE]"))
                .build();
        return new Action.Builder(Action.TYPE_VIEW)
                .setObject(object)
                .setActionStatus(Action.STATUS_TYPE_COMPLETED)
                .build();
    }

    @Override
    public void onStart() {
        super.onStart();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        client.connect();
        AppIndex.AppIndexApi.start(client, getIndexApiAction());
    }

    @Override
    public void onStop() {
        super.onStop();

        // ATTENTION: This was auto-generated to implement the App Indexing API.
        // See https://g.co/AppIndexing/AndroidStudio for more information.
        AppIndex.AppIndexApi.end(client, getIndexApiAction());
        client.disconnect();
    }

    /**
     * RecyclerView item decoration - give equal margin around grid item
     */
    public class GridSpacingItemDecoration extends RecyclerView.ItemDecoration {

        private int spanCount;
        private int spacing;
        private boolean includeEdge;

        public GridSpacingItemDecoration(int spanCount, int spacing, boolean includeEdge) {
            this.spanCount = spanCount;
            this.spacing = spacing;
            this.includeEdge = includeEdge;
        }

        @Override
        public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
            int position = parent.getChildAdapterPosition(view); // item position
            int column = position % spanCount; // item column

            if (includeEdge) {
                outRect.left = spacing - column * spacing / spanCount; // spacing - column * ((1f / spanCount) * spacing)
                outRect.right = (column + 1) * spacing / spanCount; // (column + 1) * ((1f / spanCount) * spacing)

                if (position < spanCount) { // top edge
                    outRect.top = spacing;
                }
                outRect.bottom = spacing; // item bottom
            } else {
                outRect.left = column * spacing / spanCount; // column * ((1f / spanCount) * spacing)
                outRect.right = spacing - (column + 1) * spacing / spanCount; // spacing - (column + 1) * ((1f /    spanCount) * spacing)
                if (position >= spanCount) {
                    outRect.top = spacing; // item top
                }
            }
        }
    }

    /**
     * Converting dp to pixel
     */
    private int dpToPx(int dp) {
        Resources r = getResources();
        return Math.round(TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dp, r.getDisplayMetrics()));
    }
}