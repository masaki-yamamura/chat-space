class Api::MessagesController < ApplicationController
  def index
    @new_messages = Message.where("id > ? and group_id = ?",params[:latest_id],params[:group_id])
  end
end
