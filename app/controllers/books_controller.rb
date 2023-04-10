class BooksController < ApplicationController

    def index 
        books = Book.all 
        render json: books, include: :book_clubs  ##include: ['visits', 'visits.winery']
    end

    def create
        if Book.exists?(isbn: params[:isbn])
            book = Book.find_by(isbn: params[:isbn])
            render json: book
        else
            book = Book.create(book_params)
            render json: book, include: :book_clubs, status: :created
        end
    end

    def show 
        book = find_book
        render json: book
    end

    def destroy
        book = find_book
        book.destroy
        head :no_content
    end


    private 

    def book_params
        params.permit(:title, :author, :published_date, :subject, :pages, :cover_url, :isbn)
    end

    def find_book
        Book.find_by(id: params[:id])
    end

    def return_unprocessable_entity
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end

end
