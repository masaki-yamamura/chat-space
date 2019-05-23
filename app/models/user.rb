class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :name, uniqueness: true

  has_many :messages
  has_many :group_users
  has_many :groups, through: :group_users

  def self.search_for_group(params)
    where("name LIKE(?)", "#{params[:keyword]}%").where.not(id: params[:user_ids])
  end

end
