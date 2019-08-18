package br.com.bmnv.portalaluno.app;

/**
 * Created by 16165872 on 31/05/2017.
 */

public class Anotacao {

    Integer idAnotacao;
    String titulo;
    String anotacao;
    String dataAnotacao;

    public Anotacao(String titulo, String anotacao) {
        this.titulo = titulo;
        this.anotacao = anotacao;
    }


    public String getAnotacao() {
        return anotacao;
    }

    public void setAnotacao(String anotacao) {
        this.anotacao = anotacao;
    }

    public Integer getIdAnotacao() {
        return idAnotacao;
    }

    public void setIdAnotacao(Integer idAnotacao) {
        this.idAnotacao = idAnotacao;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDataAnotacao() {
        return dataAnotacao;
    }

    public void setDataAnotacao(String data) {
        this.dataAnotacao = data;
    }





}
