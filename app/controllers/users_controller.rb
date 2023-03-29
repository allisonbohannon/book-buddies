class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users  ##include: ['visits', 'visits.winery']
    end

    def create
        user = User.create(user_params)
        if user.valid?
          session[:user_id] = user.id
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show 
        user = find_user
        render json: user
    end

    def destroy
        user = find_user
        user.destroy
        head :no_content
    end


    private 

    def user_params
        params.permit(:username, :password, :password_confirmation)
    end

    def find_user
        User.find_by(id: session[:user_id])
    end

end
