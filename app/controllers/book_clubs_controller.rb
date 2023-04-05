class BookClubsController < ApplicationController

    def index 
        books = BookClub.all 
        render json: books  ##include: ['visits', 'visits.winery']
    end

    def create
        bookclub = BookClub.create(bookclub_params)
        render json: bookclub, status: :created
    end

    def show 
        bookclub = find_bookclub
        render json: bookclub
    end

    def destroy
        bookclub = find_bookclub
        bookclub.destroy
        head :no_content
    end


    private 

    def bookclub_params
        params.permit(:book_id, :zip_three, :user_id, :status)
    end

    def find_bookclub
        BookClub.find_by(id: params[:id])
    end

    def return_unprocessable_entity
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end

end
