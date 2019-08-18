package projeto.com.br.ellreader;

/**
 * Created by 16165862 on 10/04/2017.
 */

public class Livro {
    private int id;
    private String imagemCapa;
    private String titulo;
    private String pdf;
    private String genero;
    private Integer favoritos;



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImagemCapa() {
        return imagemCapa;
    }

    public void setImagemCapa(String imagemCapa) {
        this.imagemCapa = imagemCapa;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getPdf() {
        return pdf;
    }

    public void setPdf(String pdf) {
        this.pdf = pdf;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public Integer getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(Integer favoritos) {
        this.favoritos = favoritos;
    }
}
