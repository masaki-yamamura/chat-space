class UsersController < ApplicationController
  def index
    @users = User.search_for_group(params)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit

  end

  def update

  end

  private

  def user_params
    params[:user].permit(:name, :email)
  end
  
end
